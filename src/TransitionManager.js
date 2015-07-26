var 
	  _assign = require( "lodash/object/assign" )
	  , Reflection = require( "./Reflection" )
	  , HistoryManager = require( "./HistoryManager" );

function TransitionManager( from, to, historyManager ) {
	// check required param
	if(
		typeof to == "undefined" ||
		typeof to == "undefined"
	) {
		throw new Error( "TransitionManager: Missing required param." );
		return;
	}

	// check history manager
	if( !( historyManager instanceof HistoryManager ) ) {
		throw new Error( "TransitionManager: historyManager must be an instance of HistoryManager class." );
		return;
	}

	this.from = from || null;
	this.to = to;
	this.historyManager = historyManager;
};

// start transition from actual url to new url
TransitionManager.prototype.start = function( ) {
	// create the new MatchedRouteHistory object

	// check if there's an actual route
		// if there's get the route 
};

module.exports = TransitionManager;