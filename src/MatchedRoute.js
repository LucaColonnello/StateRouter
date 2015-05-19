var 
	  _assign = require( "lodash/object/assign" )
	  , Reflection = require( "./Reflection" )
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


MatchedRoute.prototype.setup = function( next ) {
	var
		  handler = this.route.handler
		, handlerAcceptedArgs = Reflection.getArgs( handler )
		, args = [ ]
		, argsMapping = {
			next: next,
			route: this.route,
			url: this.url,
			param: this.param
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( argsMapping[ handlerAcceptedArgs[ i ] ] ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance = this.route.handler.apply( { }, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.enter = function( next ) {
	if( !this.handlerInstance.enter ) {
		next( );
		return;
	}

	var
		, handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.enter )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( argsMapping[ handlerAcceptedArgs[ i ] ] ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.enter.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.update = function( next ) {
	if( !this.handlerInstance.update ) {
		next( );
		return;
	}

	var
		, handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.update )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( argsMapping[ handlerAcceptedArgs[ i ] ] ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.update.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.exit = function( next ) {
	if( !this.handlerInstance.exit ) {
		next( );
		return;
	}

	var
		, handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.exit )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( argsMapping[ handlerAcceptedArgs[ i ] ] ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.exit.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.destroy = function( next ) {
	if( !this.handlerInstance.destroy ) {
		next( );
		return;
	}

	var
		, handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.destroy )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( argsMapping[ handlerAcceptedArgs[ i ] ] ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.destroy.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.checkUpdatable = function( ) {
	return ( ( typeof this.handlerInstance.update != "undefined" ) ? true : false );
};

module.exports = MatchedRoute;