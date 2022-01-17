function() {
				console.log( document.activeElement );
				ok( $( document.activeElement ).parents( "#select-choice-menu-focus-test-menu" ).length > 0, "item in open select menu (" + menu.length + ") has focus" );
				$(".ui-popup-screen:not(.ui-screen-hidden)").trigger( "click" );
			}