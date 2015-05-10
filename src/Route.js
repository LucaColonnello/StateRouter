var 
	_assign = require( "lodash/object/assign" );

function Route( routesCollection, routeOptions ) {
	// check required param
	if(
		!routeOptions.name ||
		!routeOptions.uri ||
		!routeOptions.handler ||
		!routesCollection
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
	this.generateCompleteUrlPattern( );
};

// generate complete url pattern and param indexing
Route.prototype.generateCompleteUrlPattern = function(){
	// get parent url pattern and param indexing if parent exists
	
	// 
	

};

Route.prototype.getUrl = function( param ) { };

Route.prototype.match = function( url ) { };


module.exports = Route;