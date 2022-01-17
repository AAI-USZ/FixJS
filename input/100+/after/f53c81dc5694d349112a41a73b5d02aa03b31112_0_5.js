function getWindowWidth() {

				if( $(window).width() < 480 ) {
					scrollCount = 1;
				} else if( $(window).width() < 768 ) {
					scrollCount = 2;
				} else if( $(window).width() < 960 ) {
					scrollCount = 3;
				} else {
					scrollCount = 4;
				}

			}