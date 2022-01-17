function( rez ) {
					return '//maps.google.com/' + rez[1] + '' + rez[2] + '&output=' + (rez[2].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}