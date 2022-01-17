function () {
								var errorfields = pe.focus($($(this).attr("href")));
								if (pe.mobile) {
									$.mobile.silentScroll(errorfields.offset().top);
								}
							}