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

		/* Event handlers */
		if ( that.s.iLeftColumns > 0 )
		{
			// When the body is scrolled - scroll the left column
			$(this.dom.scroller).on( 'scroll mousewheel', function () {
				that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
			} );

			// When scrolling the left column, scroll the body
			$(that.dom.grid.left.liner).on( 'scroll mousewheel', function () {
				that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
			} );

			if ( that.s.iRightColumns > 0 )
			{
				// When scrolling the left column, scroll the right column
				$(that.dom.grid.left.liner).on( 'scroll mousewheel', function () {
					that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
				});
			}

			// When x-scrolling in the fixed column(s) we need to pass that information on
			// to the table's body, since otherwise we just swallow that information
			// TODO - This is far from perfect - how can be be improved?
			$(that.dom.grid.left.liner).bind( "mousewheel", function(e) {
				var xDelta = e.originalEvent.wheelDeltaX / 3;
				that.dom.scroller.scrollLeft -= xDelta;
			} );
		}

		if ( that.s.iRightColumns > 0 )
		{
			// When the body is scrolled - scroll the right column
			$(this.dom.scroller).on( 'scroll mousewheel', function () {
				that.dom.grid.right.liner.scrollTop = that.dom.scroller.scrollTop;
			} );

			// When scrolling the right column, scroll the body
			$(that.dom.grid.right.liner).on( 'scroll mousewheel', function () {
				that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
			} );

			if ( that.s.iLeftColumns > 0 )
			{
				// When scrolling the right column, scroll the left column
				$(that.dom.grid.right.liner).on( 'scroll mousewheel', function () {
					that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
				});
			}

			// Adjust the body for x-scrolling
			$(that.dom.grid.right.liner).bind( "mousewheel", function(e) {
				var xDelta = e.originalEvent.wheelDeltaX / 3;
				that.dom.scroller.scrollLeft -= xDelta;
			} );
		}

		$(window).resize( function () {
			that._fnGridLayout.call( that );
		} );
		
		var bFirstDraw = true;
		this.s.dt.aoDrawCallback = [ {
			"fn": function () {
				that._fnDraw.call( that, bFirstDraw );
				that._fnGridLayout( that );
				bFirstDraw = false;
			},
			"sName": "FixedColumns"
		} ].concat( this.s.dt.aoDrawCallback );
		
		/* Get things right to start with - note that due to adjusting the columns, there must be
		 * another redraw of the main table. It doesn't need to be a full redraw however.
		 */
		this._fnGridLayout();
		this.s.dt.oInstance.fnDraw(false);
	}