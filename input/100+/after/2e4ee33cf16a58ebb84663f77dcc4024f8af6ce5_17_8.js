function() {
			var tmp,
				ol = document.getElementById( "qunit-tests" );

			if ( filter.checked ) {
				ol.className = ol.className + " hidepass";
			} else {
				tmp = " " + ol.className.replace( /[\n\t\r]/g, " " ) + " ";
				ol.className = tmp.replace( / hidepass /, " " );
			}
			if ( defined.sessionStorage ) {
				if (filter.checked) {
					sessionStorage.setItem( "qunit-filter-passed-tests", "true" );
				} else {
					sessionStorage.removeItem( "qunit-filter-passed-tests" );
				}
			}
		}