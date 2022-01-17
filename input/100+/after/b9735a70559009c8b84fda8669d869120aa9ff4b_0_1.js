function(query){
				var _t = this
				// Trim the query of whitespace unless spaces are set to be taken into consideration
				if(!_t.settings.considerSpaces) query = query.trim().replace(/\s+/gi, ' ')
				
				// Toggle visibility on list depending on query value
				if(query){
					_t.showResultsList()
					_t.settings.resultsList.addClass('loading')
				}else{
					_t.hideResultsList
				}
				
				// Store the custom callbacks so that we can intelligently override and re-call them
				var callbacks = {
					success: _t.settings.request.success,
					error: _t.settings.request.error
				}
				
				var request = $.extend(_t.settings.request, {
					// Send the data with an added query parameter
					data: $.extend(_t.settings.request.data, { query: query }),
					
					// Override the success callback, and then re-call it from the request object, so that we can perform our callbacks first
					success: function(data, status, xhr){
						_t.settings.resultsList.removeClass('loading')
						_t._renderResults(data)
						callbacks.success(data, status, xhr)
					},
					
					// Same here - override the error callback and call it again after we have performed our callbacks
					error: function(xhr, status, data){
						_t.settings.resultsList.removeClass('loading')
						callbacks.error(xhr, status, data)
					}
				})
				
				$.ajax(request)
			}