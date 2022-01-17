function(/*String*/ base, /*Object*/ locations){
			// summary:
			//		Register the specified filter libraries.
			// description:
			//		The locations parameter defines the contents of each library as a hash whose keys are the library names and values 
			//		an array of the filters exported by the library. For example, the filters exported by the date library would be:
			//	|	{ "dates": ["date", "time", "timesince", "timeuntil"] }
			// base:
			//		The base path of the libraries.
			// locations:
			//		An object defining the filters for each library as a hash whose keys are the library names and values 
			//		an array of the filters exported by the library.
			dd.register._any("filters", base, locations);
		}