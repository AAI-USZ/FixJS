function(){
					var current = $('figure', $(this));
					current.controls = $('<div class="controls" >').hide();
					current.nextbutton = $('<div class="next"><p>&#187;</p></div>');
					current.prevbutton = $('<div class="prev"><p>&#171;</p></div>');
					current.append(current.controls);
					current.controls.append(current.nextbutton);
					current.controls.append(current.prevbutton);
					Photoset.prototype.toggleButtons(current);
				}