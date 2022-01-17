function(method, cb, data, options){
			//callback handling and triggering of custom events
			var handleCallBack = function(records){
				if(cb){
					cb(records);
				}
				Game.trigger(method);
				return records;
			};

			//purely for testing purposes
			if(options && options.disableAjax){
				return handleCallBack();
			}

			//the gateway to all api calls is here.
			//it uses the jsonp wrapper for jquery.
			//the callback is transparently handled and will be returned to success
			data = $.extend(data || {}, {apiKey: settings.apiKey});
			$.ajax({
				url: [settings.votingServiceUrl, method].join('/'),
				dataType: 'jsonp',
				data: data,
				success: handleCallBack,
				timeout : 10000, //this is essential for handling the jsonp error
				error: function(e){
					console.log(e);
					Game.trigger('error');
				}
			});
		}