function () {
				that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
				if ( that.s.iLeftColumns > 0 )
				{
					that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
				}
			}