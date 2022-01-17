function () {
								var label_top = pe.focus($($(this).attr("href"))).prev().offset().top;
								if (pe.mobile) {
									$.mobile.silentScroll(label_top);
								} else {
									$(document).scrollTop(label_top);
								}
								return false;
							}