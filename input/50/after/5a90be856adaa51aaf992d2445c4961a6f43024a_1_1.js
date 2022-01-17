function() {debugger;
					var find = this.replace(".*", '');
					find = $.trim( find );
					if( ua.indexOf(find) !== -1 ) {
						isRestricted = true;
					}
				}