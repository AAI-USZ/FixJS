function(options) {
			var settings = $.extend({}, options || {});
			for(var key in $.ajaxSettings) {
				if(settings[key] === undefined) settings[key] = $.ajaxSettings[key];
			}
			if(/^data\/(.*)$/.test(settings.url)) {
				if(!that.dataFiles && that.dataUrl) {
					that.dataFiles = [];
					$.ajax({
						type: 'GET',
						url: that.dataUrl,
						dataType: 'json',
						async: false,
						success: function(data) {
							that.dataFiles = data;
						},
						error: function(xhr, type) {
						}
					});
				}
				var name = RegExp.$1,
					data = that.dataFiles[name];
				if(data) {
					if(settings.dataType == 'json') {
						data = JSON.parse(data);
					}
					return settings.success(data);
				}
			}
			ajax(options);
		}