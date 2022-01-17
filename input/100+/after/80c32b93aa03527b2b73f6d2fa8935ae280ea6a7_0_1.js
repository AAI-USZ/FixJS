function ()
	{
		var that = this;

		/* Event handlers */
		if ( that.s.iLeftColumns > 0 )
		{
			// When the body is scrolled - scroll the left column
			// When scrolling the left column, scroll the body and right column
			$(this.dom.scroller).on('scroll.DTFC', function () {
				if (that.dom.grid.left.liner.scrollTop == that.dom.scroller.scrollTop)
					return false;
				that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
			} );
			// When scrolling the left column, scroll the body
			$(that.dom.grid.left.liner).on('scroll', function () {
				if (that.dom.scroller.scrollTop == that.dom.grid.left.liner.scrollTop)
					return false
				that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
			} );

			if ( that.s.iRightColumns > 0 )
			{
				// When scrolling the left column, scroll the right column
				$(that.dom.grid.left.liner).on('scroll.DTFC', function () {
					if (that.dom.grid.right.liner.scrollTop == that.dom.grid.left.liner.scrollTop)
						return false;
					that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
				} );
			}

			// Bind to 'mousewheel' event only for Safari
			if ( $.browser.safari )
			{
				// When the body is scrolled - scroll the left column
				$(this.dom.scroller).on('mousewheel.DTFC', function () {
					that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
				} );

				// When scrolling the left column, scroll the body
				$(that.dom.grid.left.liner).on('mousewheel.DTFC', function () {
					that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
				} );

				if ( that.s.iRightColumns > 0 )
				{
					// When scrolling the left column, scroll the right column
					$(that.dom.grid.left.liner).on('mousewheel.DTFC', function () {
						that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
					} );
				}
			}


			// When x-scrolling in the fixed column(s) we need to pass that information on
			// to the table's body, since otherwise we just swallow that information
			// TODO - This is far from perfect - how can be be improved?
			$(that.dom.grid.left.liner).on('mousewheel.DTFC', function(e) {
				var xDelta = e.originalEvent.wheelDeltaX / 3;
				that.dom.scroller.scrollLeft -= xDelta;
			} );
		}

		if ( that.s.iRightColumns > 0 )
		{
			// When the body is scrolled - scroll the right column
			$(this.dom.scroller).on('scroll.DTFC', function () {
				if (that.dom.grid.right.liner.scrollTop == that.dom.scroller.scrollTop)
					return false;
				that.dom.grid.right.liner.scrollTop = that.dom.scroller.scrollTop;
			} );

			// When scrolling the right column, scroll the body
			$(that.dom.grid.right.liner).on('scroll.DTFC', function () {
				if (that.dom.scroller.scrollTop == that.dom.grid.right.liner.scrollTop)
					return false;
				that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
			} );

			if ( that.s.iLeftColumns > 0 )
			{
				// When scrolling the right column, scroll the left column
				$(that.dom.grid.right.liner).on('scroll.DTFC', function () {
					if (that.dom.grid.left.liner.scrollTop == that.dom.grid.right.liner.scrollTop)
						return false;
					that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
				} );
			}

			// Bind to 'mousewheel' event only for Safari
			if ( $.browser.safari )
			{
				// When the body is scrolled - scroll the right column
				$(this.dom.scroller).on('mousewheel.DTFC', function () {
					that.dom.grid.right.liner.scrollTop = that.dom.scroller.scrollTop;
				} );

				// When scrolling the right column, scroll the body
				$(that.dom.grid.right.liner).on('mousewheel.DTFC', function () {
					that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
				} );

				if ( that.s.iLeftColumns > 0 )
				{
					// When scrolling the right column, scroll the left column
					$(that.dom.grid.right.liner).on('mousewheel.DTFC', function () {
						that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
					} );
				}
			}

			// Adjust the body for x-scrolling
			$(that.dom.grid.right.liner).on('mousewheel.DTFC', function(e) {
				var xDelta = e.originalEvent.wheelDeltaX / 3;
				that.dom.scroller.scrollLeft -= xDelta;
			} );
		}

		$(window).resize( function () {
			that._fnGridLayout.call( that );
		} );
	}