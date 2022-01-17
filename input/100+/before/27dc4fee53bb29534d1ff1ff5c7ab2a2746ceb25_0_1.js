function(){
						var item_width = $( this ).outerWidth( true );
						$(this).addClass('slider-item-original').addClass('slider-item-' + item_index);
						//$(this).attr('title', 'width: ' + item_width + 'px');
						//item_widths[item_index] = item_width;
						items_width += item_width;
						item_index++;
					}