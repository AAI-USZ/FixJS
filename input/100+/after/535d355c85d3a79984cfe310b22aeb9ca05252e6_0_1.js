function ( oDT, oInit ) {
	/* Sanity check - you just know it will happen */
	if ( ! this instanceof FixedColumns )
	{
		alert( "FixedColumns warning: FixedColumns must be initialised with the 'new' keyword." );
		return;
	}
	
	if ( typeof oInit == 'undefined' )
	{
		oInit = {};
	}
	
	/**
	 * Settings object which contains customisable information for FixedColumns instance
	 * @namespace
	 * @extends FixedColumns.defaults
	 */
	this.s = {
		/** 
		 * DataTables settings objects
		 *  @type     object
		 *  @default  Obtained from DataTables instance
		 */
		"dt": oDT.fnSettings(),
		
		/** 
		 * Number of columns in the DataTable - stored for quick access
		 *  @type     int
		 *  @default  Obtained from DataTables instance
		 */
		"iTableColumns": oDT.fnSettings().aoColumns.length,
		
		/** 
		 * Original outer widths of the columns as rendered by DataTables - used to calculate
		 * the FixedColumns grid bounding box
		 *  @type     array.<int>
		 *  @default  []
		 */
		"aiOuterWidths": [],
		
		/** 
		 * Original inner widths of the columns as rendered by DataTables - used to apply widths
		 * to the columns
		 *  @type     array.<int>
		 *  @default  []
		 */
		"aiInnerWidths": [],
		
		/** 
		 * Flag to indicate if we are dealing with IE6/7 as these browsers need a little hack
		 * in the odd place
		 *  @type     boolean
		 *  @default  Automatically calculated
		 *  @readonly
		 */
		"bOldIE": ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0"))
	};
	
	
	/**
	 * DOM elements used by the class instance
	 * @namespace
	 * 
	 */
	this.dom = {
		/**
		 * DataTables scrolling element
		 *  @type     node
		 *  @default  null
		 */
		"scroller": null,
		
		/**
		 * DataTables header table
		 *  @type     node
		 *  @default  null
		 */
		"header": null,
		
		/**
		 * DataTables body table
		 *  @type     node
		 *  @default  null
		 */
		"body": null,
		
		/**
		 * DataTables footer table
		 *  @type     node
		 *  @default  null
		 */
		"footer": null,

		/**
		 * Display grid elements
		 * @namespace
		 */
		"grid": {
			/**
			 * Grid wrapper. This is the container element for the 3x3 grid
			 *  @type     node
			 *  @default  null
			 */
			"wrapper": null,

			/**
			 * DataTables scrolling element. This element is the DataTables
			 * component in the display grid (making up the main table - i.e.
			 * not the fixed columns).
			 *  @type     node
			 *  @default  null
			 */
			"dt": null,

			/**
			 * Left fixed column grid components
			 * @namespace
			 */
			"left": {
				"wrapper": null,
				"head": null,
				"body": null,
				"foot": null
			},

			/**
			 * Right fixed column grid components
			 * @namespace
			 */
			"right": {
				"wrapper": null,
				"head": null,
				"body": null,
				"foot": null
			}
		},
		
		/**
		 * Cloned table nodes
		 * @namespace
		 */
		"clone": {
			/**
			 * Left column cloned table nodes
			 * @namespace
			 */
			"left": {
				/**
				 * Cloned header table
				 *  @type     node
				 *  @default  null
				 */
				"header": null,
		  	
				/**
				 * Cloned body table
				 *  @type     node
				 *  @default  null
				 */
				"body": null,
		  	
				/**
				 * Cloned footer table
				 *  @type     node
				 *  @default  null
				 */
				"footer": null
			},
			
			/**
			 * Right column cloned table nodes
			 * @namespace
			 */
			"right": {
				/**
				 * Cloned header table
				 *  @type     node
				 *  @default  null
				 */
				"header": null,
		  	
				/**
				 * Cloned body table
				 *  @type     node
				 *  @default  null
				 */
				"body": null,
		  	
				/**
				 * Cloned footer table
				 *  @type     node
				 *  @default  null
				 */
				"footer": null
			}
		}
	};

	/* Attach the instance to the DataTables instance so it can be accessed easily */
	this.s.dt.oFixedColumns = this;
	
	/* Let's do it */
	this._fnConstruct( oInit );
}