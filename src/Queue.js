module.export = function Queue( ){
	// obj
	var obj = {};

	// function repository
	obj.repository = [];

	// index repository
	obj.index = -1;

	// function next
	var next = function(){
		if( typeof obj.repository[ obj.index + 1 ] == "undefined" ) return;
		
		// increment index
		obj.index++;

		if( typeof obj.repository[ obj.index ] == "function" ) {
			// call function
			obj.repository[ obj.index ]( next );
		} else if(
			typeof obj.repository[ obj.index ] == "object" &&
			typeof obj.repository[ obj.index ].handle != "undefined" &&
			typeof obj.repository[ obj.index ].condition != "undefined"
		) {
			if( obj.repository[ obj.index ].condition( ) ) {
				// call function
				obj.repository[ obj.index ].handle( next );
			} else {
				next( );
			}
		}
	};

	// add
	obj.add = function( handle ){
		// add function in repository
		obj.repository[ obj.repository.length ] = handle;
		
		// temp index var
		var _index = obj.repository.length - 1;
		
		// return promise for condition
		return {
			'if': function( condition ){
				if( condition === undefined ) return false;
				
				// add condition object to task
				obj.repository[ _index ] = {
					handle: handle,
					condition: condition
				};
			}
		};
	};

	// function start
	obj.start = function ( ) {
		next( );
	};

	//return obj
	return obj;
};