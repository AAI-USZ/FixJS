function (i) {
			iWidth = $(this).outerWidth();
			that.s.aiWidths.push( iWidth );
			if ( i < that.s.iLeftColumns )
			{
				iLeftWidth += iWidth;
			}
			if ( that.s.iTableColumns-that.s.iRightColumns <= i )
			{
				iRightWidth += iWidth;
			}
		}