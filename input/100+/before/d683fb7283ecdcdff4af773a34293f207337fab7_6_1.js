function ( domain ) {

	domain.COMIC_EVENT_ID = "nl.windgazer.EntryReceived";

	/**
	 * Basic 'interface' for implementing Comics :). None of the methods are actually
	 * implemented...
	 * @class
	 */	
	domain.Comic = Class.extend ( {

		uid: 0,
		
		/**
		 * Initializes a Comic. Basic information is required :)
		 * 
		 * @argument {int} A unique ID for this comic, try to come up with something feasible.
		 * @argument {String} The title for this comic.
		 * @constructor
		 */		
		init: function ( id, title ) {

			this.id = id;
			this.title = title;

		},

		/**
		 * The unique identifier for a Comic. Yes, essentially there could be multiple implementations
		 * for the same online Comic :). Make sure the ID stays the same, it will be used for storing
		 * the history.
		 * 
		 * @return int The unique ID for this comic.
		 */		
		getId: function ( ) {

			return this.id;

		},

		/**
		 * The title for this comic, this should be a human readable and descriptive title, most likely
		 * matching exactly what's on the online comic page...
		 * 
		 * @return String The title for this comic.
		 */
		getTitle: function ( ) {

			return this.title;

		},

		/**
		 * Fetch the latest {@link Entry} available for this Comic. This would be the last
		 * one to have been published for this comic.
		 * 
		 * @return An int ID which is unique for the request. 
		 */
		fetchLatest: function ( ) {

			throw { code:5282727478501, msg: "Method not implemented :(" };

		},

		/**
		 * Fetch the last {@link Entry} read by the user. This would as indicated mean
		 * the last one read, and not the last one published...
		 * 
		 * @return An int ID which is unique for the request. 
		 */
		fetchLast: function ( ) {

			throw { code:5282727478501, msg: "Method not implemented :(" };

		},

		/**
		 * Fetch a specific {@link Entry} by URL. Most likely a UI will be provided for
		 * doing this as well, thus allowing somebody to start where they left of before
		 * starting to use this reader... Internally this of course will be used for 
		 * converting stored URL's to actual entries ;).
		 * 
		 * @return An int ID which is unique for the request. 
		 */
		fetchByURL: function ( URL ) {

			throw { code:5282727478501, msg: "Method not implemented :(" };

		},

		/**
		 * 
		 * Get the last read URL for this comic from history.
		 * 
		 */		
		getLastURL: function (  ) {

			return History.retreiveURL( this.id );

		},
		
		getUID: function (  ) {

			return this.uid++;

		}

	} );

}