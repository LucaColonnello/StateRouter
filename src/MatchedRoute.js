var 
	  _assign = require( "lodash/object/assign" )
	  , Route = require( "./Route" );

function MatchedRoute( route, url, param ) {
	// check required param
	if(
		typeof route == "undefined" ||
		typeof url == "undefined" ||
		!( route instanceof Route )
	) {
		throw new Error( "MatchedRoute: Missing required param." );
		return;
	}

	// set to object
	this.route = route;
	this.url = url;
	this.param = param;

	this.handlerInstance = null;
};


MatchedRoute.prototype.setup = function() { };
MatchedRoute.prototype.enter = function( next ) { };
MatchedRoute.prototype.update = function( next ) { };
MatchedRoute.prototype.exit = function( next ) { };
MatchedRoute.prototype.destroy = function( next ) { };


module.exports = MatchedRoute;