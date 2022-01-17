function(e) { 
					var link = $(this),
						cl   = hover+' '+dropover;

					if (insideNavbar(e.clientX)) {
						link.addClass(cl)
						if (link.is('.'+collapsed+':not(.'+expanded+')')) {
							setTimeout(function() {
								link.is('.'+dropover) && link.children('.'+arrow).click();
							}, 500);
						}
					} else {
						link.removeClass(cl);
					}
				}