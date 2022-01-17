function() {
				var bgH = $($.mustache(template('config-head'), {title:'Background Styles', code: 'background'}));
				container.append(bgH);
				
				function updateColorElement(){
					color = newStyle.background.color;
					var c = "rgba(" + color.r + "," + color.g + "," + color.b + "," + (color.alpha || 1) + ")";
					$(element).css("background-color", c).css("-moz-box-shadow", "0px 0px 10px " + c)
						.css("-webkit-box-shadow", "0px 0px 10px " + c).css("box-shadow", "0px 0px 10px " + c);	
				}
				
				function colorChanged(color){
					var alpha = newStyle.background.color.alpha || 1;
					color.alpha = alpha;
					newStyle.background.color = color;
					updateColorElement();
				}
				
				this.color(bgH, newStyle.background, colorChanged);
				colorChanged(newStyle.background.color);
				
				if (settings.background.color.alpha) {
					function alphaChanged(alpha){
						newStyle.background.color.alpha = alpha;
						updateColorElement();
					}
					
					this.alpha(bgH,newStyle.background.color, alphaChanged);
					alphaChanged(newStyle.background.color.alpha);
				}
				
				function imageFileChanged(file){
					newStyle.background.image = newStyle.background.image || {};
					if(file){
						newStyle.background.image.high = file;
						$(element).css("backgroundImage", "url('images/" + file + "')");
					}
					else {
						newStyle.background.image.high = '';
						$(element).css("backgroundImage", "none");
					}
				}
				
				function seamlessChanged(seamless){
					newStyle.background.image = newStyle.background.image || {};
					newStyle.background.image.seamless = seamless;
					if (seamless)
						$(element).css("background-position", "repeat").css("background-size", "auto");
 					else $(element).css("background-size", "100% 100%").css("background-position", "no-repeat");
				}
				
				this.image(bgH,newStyle.background, imageFileChanged, seamlessChanged);
				imageFileChanged((newStyle.background.image && newStyle.background.image.high) || '');
				seamlessChanged(newStyle.background.image.seamless);
			}