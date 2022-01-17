function(container, type) {
			  var background = document.getElementById("canvas_background");
			  var cur = {color: "#fff", opacity: 1}
			  if (type == "stroke") cur = curConfig['initStroke'];
			  if (type == "fill") cur = curConfig['initFill'];
			  if (type == "canvas" && background) {
          var rgb = background.getAttribute("fill").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
          if (rgb) {
            var hex = ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
                           ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                           ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
            cur = {color: hex, opacity: 1}
          }
			  }


				// set up gradients to be used for the buttons
				var svgdocbox = new DOMParser().parseFromString(
					'<svg xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%"\
					fill="#' + cur.color + '" opacity="' + cur.opacity + '"/>\
					<defs><linearGradient id="gradbox_"/></defs></svg>', 'text/xml');
				var docElem = svgdocbox.documentElement;
				
				docElem = $(container)[0].appendChild(document.importNode(docElem, true));

				docElem.setAttribute('width',24.5);
				
				this.rect = docElem.firstChild;
				this.defs = docElem.getElementsByTagName('defs')[0];
				this.grad = this.defs.firstChild;
				this.paint = new $.jGraduate.Paint({solidColor: cur.color});
				this.type = type;

				this.setPaint = function(paint, apply) {
					this.paint = paint;
					
					var fillAttr = "none";
					var ptype = paint.type;
					var opac = paint.alpha / 100;
					switch ( ptype ) {
						case 'solidColor':
							fillAttr = (paint[ptype] == 'none' || paint[ptype] == 'one') ? 'none' : "#" + paint[ptype];
							break;
						case 'linearGradient':
						case 'radialGradient':
							this.defs.removeChild(this.grad);
							this.grad = this.defs.appendChild(paint[ptype]);
							var id = this.grad.id = 'gradbox_' + this.type;
							fillAttr = "url(#" + id + ')';
					}
					
					this.rect.setAttribute('fill', fillAttr);
					this.rect.setAttribute('opacity', opac);
					
					if(apply) {
						svgCanvas.setColor(this.type, fillAttr, true);
						svgCanvas.setPaintOpacity(this.type, opac, true);
					}
					if (this.type == "canvas") {
					  //recache background in case it changed
					  var background = document.getElementById("canvas_background");
					  if (background) background.setAttribute('fill', fillAttr)
					  else createBackground(fillAttr)
					  console.log(background.getAttribute('fill'));
					}
					
				}
				
				this.update = function(apply) {
					if(!selectedElement) return;
					var type = this.type;
					switch ( selectedElement.tagName ) {
					case 'use':
					case 'image':
					case 'foreignObject':
						// These elements don't have fill or stroke, so don't change 
						// the current value
						return;
					case 'g':
					case 'a':
						var gPaint = null;
					
						var childs = selectedElement.getElementsByTagName('*');
						for(var i = 0, len = childs.length; i < len; i++) {
							var elem = childs[i];
							var p = elem.getAttribute(type);
							if(i === 0) {
								gPaint = p;
							} else if(gPaint !== p) {
								gPaint = null;
								break;
							}
						}
						if(gPaint === null) {
							// No common color, don't update anything
							var paintColor = null;
							return;
						}
						var paintColor = gPaint;
						
						var paintOpacity = 1;
						break;
					default:
						var paintOpacity = parseFloat(selectedElement.getAttribute(type + "-opacity"));
						if (isNaN(paintOpacity)) {
							paintOpacity = 1.0;
						}
						
						var defColor = type === "fill" ? "black" : "none";
						var paintColor = selectedElement.getAttribute(type) || defColor;
					}

					if(apply) {
						svgCanvas.setColor(type, paintColor, true);
						svgCanvas.setPaintOpacity(type, paintOpacity, true);
					}

					paintOpacity *= 100;					
					
					var paint = getPaint(paintColor, paintOpacity, type);
					// update the rect inside #fill_color/#stroke_color
					this.setPaint(paint);
				}
				
				this.prep = function() {
					var ptype = this.paint.type;
				
					switch ( ptype ) {
						case 'linearGradient':
						case 'radialGradient':
							var paint = new $.jGraduate.Paint({copy: this.paint});
							svgCanvas.setPaint(type, paint);
					}
				}
			}