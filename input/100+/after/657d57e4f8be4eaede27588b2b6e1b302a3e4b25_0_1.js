function (event) {
					if (event.type == 'keydown' && event.keyCode != 13) {
						return; // only react to enter key, not to other keys
					}
					var data = $(inputSelector).serialize();
					if (settings.pageVar !== undefined) {
						data += '&' + settings.pageVar + '=1';
					}
					if (settings.enableHistory && settings.ajaxUpdate !== false && window.History.enabled) {
						// Ajaxify this link
						var url = $('#' + id).yiiGridView('getUrl'),
							params = $.deparam.querystring($.param.querystring(url, data));

						delete params[settings.ajaxVar];
						History.pushState(null, null, $.param.querystring(url.substr(0, url.indexOf('?')), params));
					} else {
						$('#' + id).yiiGridView('update', {data: data});
					}
				}