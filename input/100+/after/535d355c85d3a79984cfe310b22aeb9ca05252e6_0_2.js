function ( oInit )
	{
		var i, iLen, iWidth,
			that = this;
		
		/* Sanity checking */
		if ( typeof this.s.dt.oInstance.fnVersionCheck != 'function' ||
		     this.s.dt.oInstance.fnVersionCheck( '1.8.0' ) !== true )
		{
			alert( "FixedColumns "+FixedColumns.VERSION+" required DataTables 1.8.0 or later. "+
				"Please upgrade your DataTables installation" );
			return;
		}
		
		if ( this.s.dt.oScroll.sX === "" )
		{
			this.s.dt.oInstance.oApi._fnLog( this.s.dt, 1, "FixedColumns is not needed (no "+
				"x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for "+
				"column fixing when scrolling is not enabled" );
			return;
		}
		
		/* Apply the settings from the user / defaults */
		this.s = $.extend( true, this.s, FixedColumns.defaults, oInit );

		/* Set up the DOM as we need it and cache nodes */
		this.dom.grid.dt = $(this.s.dt.nTable).parents('div.dataTables_scroll')[0];
		this.dom.scroller = $('div.dataTables_scrollBody', this.dom.grid.dt )[0];

		var iScrollWidth = $(this.dom.grid.dt).width();
		var iLeftWidth = 0;
		var iRightWidth = 0;

		$('tbody>tr:eq(0)>td, tbody>tr:eq(0)>th', this.s.dt.nTable).each( function (i) {
			// Inner width is used to assign widths to cells
			that.s.aiInnerWidths.push( $(this).width() );
			
			// Outer width is used to calculate the container
			iWidth = $(this).outerWidth();
			that.s.aiOuterWidths.push( iWidth );

			if ( i < that.s.iLeftColumns )
			{
				iLeftWidth += iWidth;
			}
			if ( that.s.iTableColumns-that.s.iRightColumns <= i )
			{
				iRightWidth += iWidth;
			}
		} );

		if ( this.s.iLeftWidth === null )
		{
			this.s.iLeftWidth = this.s.sLeftWidth == 'fixed' ?
				iLeftWidth : (iLeftWidth/iScrollWidth) * 100; 
		}

		if ( this.s.iRightWidth === null )
		{
			this.s.iRightWidth = this.s.sRightWidth == 'fixed' ?
				iRightWidth : (iRightWidth/iScrollWidth) * 100;
		}
		
		/* Set up the DOM that we want for the fixed column layout grid */
		this._fnGridSetup();

		/* Use the DataTables API method fnSetColumnVis to hide the columns we are going to fix */
		for ( i=0 ; i<this.s.iLeftColumns ; i++ )
		{
			this.s.dt.oInstance.fnSetColumnVis( i, false );
		}
		for ( i=this.s.iTableColumns - this.s.iRightColumns ; i<this.s.iTableColumns ; i++ )
		{
			this.s.dt.oInstance.fnSetColumnVis( i, false );
		}

		/* Event handlers */
		$(this.dom.scroller).scroll( function () {
			that.dom.grid.left.body.scrollTop = that.dom.scroller.scrollTop;
			if ( that.s.iRightColumns > 0 )
			{
				that.dom.grid.right.body.scrollTop = that.dom.scroller.scrollTop;
			}
		} );

		$(window).resize( function () {
			that._fnGridLayout.call( that );
		} );
		
		var bFirstDraw = true;
		this.s.dt.aoDrawCallback = [ {
			"fn": function () {
				that._fnDraw.call( that, bFirstDraw );
				that._fnGridHeight( that );
				bFirstDraw = false;
			},
			"sName": "FixedColumns"
		} ].concat( this.s.dt.aoDrawCallback );
		
		/* Get things right to start with - note that due to adjusting the columns, there must be
		 * another redraw of the main table. It doesn't need to be a full redraw however.
		 */
		this._fnGridLayout();
		this._fnGridHeight();
		this.s.dt.oInstance.fnDraw(false);
	}