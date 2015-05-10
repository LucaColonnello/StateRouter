var 
	_assign = require( "lodash/object/assign" ),
	Route = require( "./Route" );

function RoutesCollection( ) {
	this.routes = { };
};

RoutesCollection.prototype.addRoute = function( route ) {
	// check object's type
	if( instanceof route == Route ) {
		throw new Error( "RoutesCollection.addRoute: object is not a Route." );
		return;
	}

	this.routes[ route.name ] = route;
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

	return ( ( typeof this.routes[ routeName ] != "undefined" ) true : false );
};


module.exports = RoutesCollection;