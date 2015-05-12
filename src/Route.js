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
		!routeOptions.uri ||
		!routeOptions.handler
	) {
		throw new Error( "Route: Missing required param." );
		return;
	}

	// set options to this
	_assign( this, {
		name: null,
		uri: null,
		parent: false,
		validationRules: false,
		paramIndexing: false,
		guards: false,
		hooks: false,
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

	// generate complete url pattern
	this.generateCompleteUrlAndRegExp( );
};

// generate complete url, regexp and param indexing
Route.prototype.generateCompleteUrlAndRegExp = function( ) {
	// get parent url pattern and param indexing if parent exists
	var 
		  parentRoute
		, basePath = ""
		, regexp = ""
		, paramIndexing;

	// check parent
	if( this.parent ) {
		parentRoute = this.routesCollection.getRoute( this.parent );
		basePath = parentRoute.completeUrl;
		regexp = parentRoute.regexp;
		paramIndexing = ( ( parentRoute.paramIndexing ) ? _assign( [ ], parentRoute.paramIndexing ) : null );
	}
	
	// calculate complete url
	this.completeUrl = basePath + this.uri;

	// look for placeholder and translate it to paramIndexing
	var placeholder = [ ];
	placeholder = this.uri.match( /\[([a-zA-Z0-9\_\-]+)\]/g );

	// copy pattern in regxep
	regexp += this.uri.replace(/\//g, "\\/");

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

	// set to object
	this.paramIndexing = paramIndexing || false;
	this.regexp = regexp;
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
			throw new Error( "Route.getUrl: " + this.name + ", Validation errors founded: " + validationErrors.length + ", " + JSON.stringify( validationErrors ) );
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
			return state;
		}


		// set match
		state.match = true;
	}

	return state;
};

Route.prototype.validateParameters = function( param ) { };


module.exports = Route;


// do this import at the end of file,
// because it requires Route,
// that at this point is not defined
RoutesCollection = require( "./RoutesCollection" );