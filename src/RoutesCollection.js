var 
	  _assign = require( "lodash/object/assign" )
	, Route = require( "./Route" );

function RoutesCollection( ) {
	this.routes = { };
};

RoutesCollection.prototype.addRoute = function( _route ) {
	// check object's type
	if( !( _route instanceof Route ) ) {
		throw new Error( "RoutesCollection.addRoute: object is not a Route." );
		return;
	}

	this.routes[ _route.name ] = _route;
};

RoutesCollection.prototype.getRoute = function( routeName ) {
	// check route name
	if( typeof routeName == "undefined" ) {
		throw new Error( "RoutesCollection.getRoute: no routeName specified." );
		return;
	}

	// check route exists
	if( !this.checkRouteExists( routeName ) ) {
		throw new Error( "RoutesCollection.getRoute: no route exists with specified name." );
		return;
	}

	return this.routes[ routeName ];
};

RoutesCollection.prototype.checkRouteExists = function( routeName ) {
	// check route name
	if( typeof routeName == "undefined" ) {
		throw new Error( "RoutesCollection.checkRouteExists: no routeName specified." );
		return;
	}

	return ( ( typeof this.routes[ routeName ] != "undefined" ) ? true : false );
};


module.exports = RoutesCollection;