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
			
				// Send AJAX request with specified settings except for some explicit, required overridings
				$.ajax($.extend(_t.settings.request, {
					data: $.extend(_t.settings.request.data, { query: query }),
					success: function(data, status, xhr){
						_t.settings.resultsList.removeClass('loading')
						_t._renderResults(data)
					}
				}))
			}