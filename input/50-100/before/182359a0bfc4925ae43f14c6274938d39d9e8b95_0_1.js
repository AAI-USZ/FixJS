function() {
				same( menu.find( ":focus" ).length, 1, "item in open select menu (" + menu.length + ") has focus" );
				select.selectmenu( "close" );
			}