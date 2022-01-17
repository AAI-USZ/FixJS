function(i){ 
					var thisLi = $('<li><span>'+o.labelFilter(this)+'</span></li>')
						.prepend('<span class="line" />')
						.css('left', xInterval * i)
						.appendTo(xlabelsUL);						
					var label = thisLi.find('span:not(.line)');
					var leftOffset = label.width()/-2;
					if(i == 0){ leftOffset = 0; }
					else if(i== xLabels.length-1){ leftOffset = -label.width(); }
					label
						.css('margin-left', leftOffset)
						.addClass('label');
				}