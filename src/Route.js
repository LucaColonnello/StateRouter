var 
	  _assign = require( "lodash/object/assign" )
	, RoutesCollection;

function Route( routesCollection, routeOptions ) {
	// check required param
	if(
		typeof routeOptions == "undefined" ||
		typeof routesCollection == "undefined" ||
		!( routesCollection instanceof RoutesCollection ) ||
		!routeOptions.name ||
		!routeOptions.url ||
		!routeOptions.handler
	) {
		throw new Error( "Route: Missing required param." );
		return;
	}

	// set options to this
	_assign( this, {
		name: null,
		url: null,
		parent: false,
		validationRules: false,
		paramIndexing: false,
		policy: false,
		handler: null
	}, routeOptions );

	// set routes collection
	// this ref is used to create the url
	// and to check parent exists
	this.routesCollection = routesCollection;

	// check parent exists
	if( this.parent && !this.routesCollection.checkRouteExists( this.parent ) ) {
		throw new Error( "Route: No parent exists with specified name." );
		return;
	}

	// prepare route to match
	this.prepareToMatch( );
};

// generate complete url pattern
// get parent url and param indexing
// set validation rules by parent
Route.prototype.prepareToMatch = function( ) {
	// get parent url pattern and param indexing if parent exists
	var 
		  parentRoute
		, basePath = ""
		, regexp = ""
		, navigationTree
		, paramIndexing;

	// check parent
	if( this.parent ) {
		parentRoute = this.routesCollection.getRoute( this.parent );
		basePath = parentRoute.completeUrl;
		regexp = parentRoute.regexp;
		navigationTree = ( ( parentRoute.navigationTree ) ? _assign( [ ], parentRoute.navigationTree ) : null );
		paramIndexing = ( ( parentRoute.paramIndexing ) ? _assign( [ ], parentRoute.paramIndexing ) : null );
	}
	
	// calculate complete url
	this.completeUrl = basePath + this.url;

	// look for placeholder and translate it to paramIndexing
	var placeholder = [ ];
	placeholder = this.url.match( /\[([a-zA-Z0-9\_\-]+)\]/g );

	// copy pattern in regxep
	regexp += this.url.replace(/\//g, "\\/");

	// check placeholder
	if( placeholder && placeholder.length ) {
		// create paramIndexing if not exists yet
		if( !paramIndexing ) paramIndexing = [ ];

		for( var i = 0; i < placeholder.length; i++ ) {
			// get param name
			paramIndexing.push( placeholder[ i ].substr( 1, placeholder[ i ].length - 2 ) );

			// replace parameter
			regexp = regexp.replace( placeholder[ i ], "([0-9a-zA-Z\\_\\-]+)" );
		}
	}

	// calculate navigation tree
	if( !navigationTree ) navigationTree = [ ];
	navigationTree.push( this.name );

	// set to object
	this.paramIndexing = paramIndexing || false;
	this.regexp = regexp;
	this.navigationTree = navigationTree;
};

Route.prototype.getUrl = function( param ) {
	var url = this.completeUrl;

	// check param
	if( this.paramIndexing.length ) {
		// loop for validation
		for( var i in this.paramIndexing ) {
			if( !param[ this.paramIndexing[ i ] ] ) {
				throw new Error( "Route.getUrl: " + this.name + ", No param " + this.paramIndexing[ i ] + " founded" );
				return false;
			}
		}

		// validate params
		var validationErrors = this.validateParameters( param );
		if( validationErrors && validationErrors.length ) {
			throw new Error( "Route.getUrl: " + this.name + ", Validation errors founded: " + validationErrors.length );
			console.log( validationErrors );
			return false;
		}

		// replace params
		for( var i in param ) {
			// replace parameter
			url = url.replace( "[" + i + "]", param[ i ] );
		}
	}

	return url;
};

Route.prototype.match = function( url ) {
	// state
	var state = {
		match: false,
		param: false
	};

	// check pattern
	var p = url.match( new RegExp( "^" + this.regexp + "$" ) );
	if( p && p.length ) {
		// check parameters
		if( this.paramIndexing.length ) {
			for( var i = 0; i < this.paramIndexing.length; i++ ) {
				// check param
				if( !p[ i + 1 ] ) {
					return state;
				}

				// add to param
				if( !state.param ) state.param = { };
				state.param[ this.paramIndexing[ i ] ] = p[ i + 1 ];
			}
		}

		
		// check validation
		var validationErrors = this.validateParameters( state.param );
		if( validationErrors && validationErrors.length ) {
			return false;
		}


		// set match
		state.match = true;
	}

	return state;
};


Route.prototype.validateParameters = function( param ) {
	// validation errors collection
	var validationErrors = false;

	// check if it has parent and parent has validators
	if( this.parent ) {
		var parentRoute = this.routesCollection.getRoute( this.parent );
		if( parentRoute.validationRules ) {
			validationErrors = parentRoute.validateParameters( param );
		}
	}

	// check validation rules
	if( this.validationRules ) {
		for( var i in this.validationRules ) {
			if( typeof param[ i ] != "undefined" ) {
				// do different things based on type of validation rule
				switch( typeof this.validationRules[ i ] ) {
					case 'object': {
						if( !this.validationRules[ i ].test( param[ i ] ) ) {
							if( !validationErrors ) validationErrors = [ ];
							validationErrors.push( i );
						}
						break;
					}
					case 'function': {
						if( !this.validationRules[ i ]( param[ i ] ) ) {
							if( !validationErrors ) validationErrors = [ ];
							validationErrors.push( i );
						}
						break;
					}
				}
			}
		}
	}

	return validationErrors;
};


module.exports = Route;


// do this import at the end of file,
// because it requires Route to be defined
RoutesCollection = require( "./RoutesCollection" );