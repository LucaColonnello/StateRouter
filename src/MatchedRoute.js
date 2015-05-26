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


MatchedRoute.prototype.setup = function( ) {
	var
		  handler = this.route.handler
		, handlerAcceptedArgs = Reflection.getArgs( handler )
		, args = [ ]
		, argsMapping = {
			route: this.route,
			url: this.url,
			param: this.param
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( typeof argsMapping[ handlerAcceptedArgs[ i ] ] != "undefined" ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance = { };
	handler.apply( this.handlerInstance, args );
};

MatchedRoute.prototype.enter = function( next ) {
	if( !this.handlerInstance ) {
		throw new Error( "MatchedRoute - " + this.route.name + ": you have to setup the handler, please call setup() method first" );
		return;
	}

	if( !this.handlerInstance.enter ) {
		next( );
		return;
	}

	var
		  handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.enter )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( typeof argsMapping[ handlerAcceptedArgs[ i ] ] != "undefined" ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.enter.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.update = function( next ) {
	if( !this.handlerInstance ) {
		throw new Error( "MatchedRoute - " + this.route.name + ": you have to setup the handler, please call setup() method first" );
		return;
	}

	// if can't update call exit and then enter instead
	if( !this.handlerInstance.update ) {
		this.exit( function( ) {
			this.enter( next );
		}.bind( this ) );
		return;
	}

	var
		  handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.update )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( typeof argsMapping[ handlerAcceptedArgs[ i ] ] != "undefined" ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.update.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.exit = function( next ) {
	if( !this.handlerInstance ) {
		throw new Error( "MatchedRoute - " + this.route.name + ": you have to setup the handler, please call setup() method first" );
		return;
	}

	if( !this.handlerInstance.exit ) {
		next( );
		return;
	}

	var
		  handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.exit )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( typeof argsMapping[ handlerAcceptedArgs[ i ] ] != "undefined" ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.exit.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

MatchedRoute.prototype.destroy = function( next ) {
	if( !this.handlerInstance ) {
		throw new Error( "MatchedRoute - " + this.route.name + ": you have to setup the handler, please call setup() method first" );
		return;
	}

	if( !this.handlerInstance.destroy ) {
		next( );
		return;
	}

	var
		  handlerAcceptedArgs = Reflection.getArgs( this.handlerInstance.destroy )
		, args = [ ]
		, argsMapping = {
			next: next
		}
	;
	
	for( var i = 0; i < handlerAcceptedArgs.length; i++ ) {
		if( typeof argsMapping[ handlerAcceptedArgs[ i ] ] != "undefined" ) {
			args[i] = argsMapping[ handlerAcceptedArgs[ i ] ];
		}
	}

	this.handlerInstance.destroy.apply( this.handlerInstance, args );

	if( handlerAcceptedArgs.indexOf( "next" ) == -1 ) {
		next( );
	}
};

module.exports = MatchedRoute;