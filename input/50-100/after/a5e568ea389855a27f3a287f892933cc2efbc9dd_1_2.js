function(){
			  this.addEventListener("mouseup", function(){
				  var letter = this.id.replace('tool_pos','').charAt(0);
				  svgCanvas.alignSelectedElements(letter, 'page');
				})
			}