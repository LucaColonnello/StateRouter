function MatchedRouteHistory( ) {
	// index of history
	// this is a pointer to the actual history state
	this.index = 0;

	// urls to be navigated
	this.urls = [ ];

	// matched route for each url
	this.matchedRoutes = [ ];
};

// attributes
// 
// (int)			index
// (array)			urls
// (array)			matched route by url index
// 
// --
// 
// methods
// 
// (void)			set urls
// (void)			go next (params: matched route)
// (matched route)	get actual matched route
// 
// --
// 
// tests
// set urls - pass array of urls, expect equal to passed array
// go next - pass a matched route, expect index equal to old index + 1 and last matched route equal to passed matched route


module.exports = MatchedRouteHistory;