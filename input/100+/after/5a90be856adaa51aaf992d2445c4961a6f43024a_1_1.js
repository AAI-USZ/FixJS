function() {
			var restrictedStrings = this.getConfig( 'restrictedUserAgents' );
			var isRestricted = false;
			if( restrictedStrings ) {
				var ua = navigator.userAgent.toLowerCase();
				restrictedStrings = restrictedStrings.toLowerCase();
				restrictedStrings = restrictedStrings.split(",");
				$.each( restrictedStrings, function() {debugger;
					var find = this.replace(".*", '');
					find = $.trim( find );
					if( ua.indexOf(find) !== -1 ) {
						isRestricted = true;
					}
				});
			}
			return isRestricted;
		}