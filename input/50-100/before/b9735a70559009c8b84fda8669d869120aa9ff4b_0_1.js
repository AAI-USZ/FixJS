function(_, result){
						var resultItem
						if(_t.settings.template){
							resultItem = $('<li>').html($.tmpl(_t.settings.template, result))
						}else{
							if(typeof result == "object") _t.throwError('Response was of type Object, but no text/html-template was specified')
							resultItem = $('<li>').html(result)
						}
						
						// Extract HTML as a string and add it to the html variable (ugly, but works...)
						body += $("<div>").html(resultItem).html()
					}