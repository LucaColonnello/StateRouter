var
	Route = require( "./Route" ),
	Queue = require( "./Queue" );

module.exports = function Traveler( ) { };

// compile with
// browserify src/Traveler.js -s Traveler | uglifyjs > dist/Traverler.js 