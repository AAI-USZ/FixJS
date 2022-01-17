function() {
					if( eq.bind( this )() ) {
						$( this ).show();
						diff += 1;
					} else {
						$( this ).hide();
						diff -= 1;
					}
				}