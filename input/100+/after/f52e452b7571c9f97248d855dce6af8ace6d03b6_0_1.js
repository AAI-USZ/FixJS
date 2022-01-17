function(element, content) {
				var	fontSize = element.css('fontSize'),
					size     = 1;
				
				if(element.attr('size'))
					size = element.attr('size');
				// Most browsers return px value but IE returns 1-7
				else if(fontSize.indexOf("px") > -1) {
					// convert size to an int
					fontSize = fontSize.replace("px", "") - 0;

					if(fontSize > 12)
						size = 2;
					if(fontSize > 15)
						size = 3;
					if(fontSize > 17)
						size = 4;
					if(fontSize > 23)
						size = 5;
					if(fontSize > 31)
						size = 6;
					if(fontSize > 47)
						size = 7;
				}
				else
					size = fontSize;

				return '[size=' + size + ']' + content + '[/size]';
			}