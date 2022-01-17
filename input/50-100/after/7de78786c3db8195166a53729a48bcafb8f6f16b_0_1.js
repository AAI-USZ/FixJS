function(i){
					var thisLi = $('<li><span class="label">'+o.labelFilter(this)+'</span></li>')
						.prepend('<span class="line" />')
						.css('left', xInterval * i)
						.width(xInterval)
						.appendTo(xlabelsUL);

					if (horizontal)	{
						var label = thisLi.find('span.label');
						label.css("margin-left", -label.width() / 2);
					}
				}