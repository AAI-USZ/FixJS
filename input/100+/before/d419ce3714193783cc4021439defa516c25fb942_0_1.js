function () {
						// We're dealing with arbitary non-sorting link
						if (!$(this).hasClass('sort-link'))
							return true;
						// Check to see if History.js is enabled for our Browser
						if (settings.enableHistory && window.History.enabled) {
							// Ajaxify this link
							var url = $(this).attr('href'),
								params = $.deparam.querystring(url);

							delete params[settings.ajaxVar];
							window.History.pushState(null, null, $.param.querystring(url.substr(0, url.indexOf('?')), params));
						} else {
							$('#' + id).yiiGridView('update', {url: $(this).attr('href')});
						}
						return false;
					}