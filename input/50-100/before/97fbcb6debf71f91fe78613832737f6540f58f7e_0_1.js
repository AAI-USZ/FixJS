function () {
				that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
				if ( that.s.iRightColumns > 0 )
				{
					that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
				}
			}