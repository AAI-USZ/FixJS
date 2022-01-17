function (i) {
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
		}