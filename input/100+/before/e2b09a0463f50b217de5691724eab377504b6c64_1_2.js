function(data){
				// Content loaded, hide "loading" content.
				$( '.bbq-loading' ).hide();
				glob.lastHash = hash;
				ajaxResponceHandler(data, 'hash');
				_gaq.push(['_trackPageview', hash]);
			}