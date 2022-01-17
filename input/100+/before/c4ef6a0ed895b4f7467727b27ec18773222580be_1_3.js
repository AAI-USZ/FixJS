function(paint, apply) {
					this.paint = paint;
					
					var fillAttr = "none";
					var ptype = paint.type;
					var opac = paint.alpha / 100;
					
					switch ( ptype ) {
						case 'solidColor':
							fillAttr = "#" + paint[ptype];
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
				}