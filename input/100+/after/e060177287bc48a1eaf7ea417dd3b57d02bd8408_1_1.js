function (name, value) {

	var property = $(this.htmlPlayer).data("property");
	property[name] = value ? value : "";
	$(this.htmlPlayer).data("property",property);
	
	// TODO: verificar os eventos
	$(this.htmlPlayer).trigger("attribution.onBeginAttribution",[name]);
	
	if (value != null) {
	
		switch (name) {
		
			// POSITION/DIMENSION
			
			case "top":
			case "left":
			case "bottom":
			case "right": {
				// TODO: %
				$(this.htmlPlayerBkg).css(name,value);
				break;
			}
			case "height":
			case "width": {
				var buffer = value.split("%");
				if (buffer.length > 1) {
					var currentValue = $(this.htmlPlayerBkg).css(name);
					value = parseInt(parseInt(currentValue)*parseFloat(buffer[0])/100);
				}
				$(this.htmlPlayer).css(name,value);
				$(this.htmlPlayerBkg).css(name,value);
				break;
			}
			case "location": {
				var location = value.split(",");
				this.setProperty("left",bounds[0]);
				this.setProperty("top",bounds[1]);
				return;
			}
			case "size": {
				var size = value.split(",");
				this.setProperty("width",bounds[0]);
				this.setProperty("height",bounds[1]);
				return;
			}
			case "bounds": {
				var bounds = value.split(",");
				this.setProperty("left",bounds[0]);
				this.setProperty("top",bounds[1]);
				this.setProperty("width",bounds[2]);
				this.setProperty("height",bounds[3]);
				return;
			}
			case "zIndex": {
				$(this.htmlPlayer).css("z-index",value)
				$(this.htmlPlayerBkg).css("z-index",value)
				break;
			}
			
			// SOUND
			
			case "soundLevel": {
				if (this.checkType(["video","audio"])) {
					var buffer = value.split("%");
					if (buffer.length > 1) {
						value = buffer[0] / 100;
					}
					this.popcornPlayer.volume(value);
				}
				break;
			}
			case "balanceLevel":
			case "bassLevel":
			case "trebleLevel": {
				var buffer = value.split("%");
				if (buffer.length > 1) {
					value = buffer[0] / 100;
				}
				// TODO (0.0-1.0)
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"setProperty",[name]);
				break;
			}
			
			// VISIBILITY
			
			case "background": {
				$(this.htmlPlayerBkg).css("background-color",value);
				break;
			}
			case "transparency": {
				var buffer = value.split("%");
				if (buffer.length > 1) {
					value = parseInt(buffer[0]) / 100;
				} else {
					value = parseFloat(buffer[0]);
				}
				this.opacity = 1 - value;
				$(this.htmlPlayer).css("opacity",this.opacity);
				break;
			}
			case "visible": {
				this.isVisible = value=="true"?true:false;
				if (this.isVisible) {
					if(this.node.descriptor){
						this.presentation.focusManager.addMedia(this.node.descriptor.focusIndex,this.htmlPlayer);
					}
					$(this.htmlPlayerBkg).css("display","inline");
				} else {
					if(this.node.descriptor){
						this.presentation.focusManager.removeMedia(this.node.descriptor.focusIndex,this.htmlPlayer);
					}
					$(this.htmlPlayerBkg).css("display","none");
				}
				break;
			}
			case "scroll": {
				// TODO: ver norma (p.44)
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"setProperty",[name]);
				break;
			}
			case "fit": {
				// TODO: ver norma (p.44)
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"setProperty",[name]);
				break;
			}
			case "style": {
				// TODO: url de um arquivo css
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"setProperty",[name]);
				break;
			}
			
			// FONT
			
			case "fontColor": {
				$(this.htmlPlayer).css("color",value);
				break;
			}
			case "fontFamily": {
				$(this.htmlPlayer).css("font-family",value);
				break;
			}
			case "fontStyle": {
				$(this.htmlPlayer).css("font-style",value);
				break;
			}
			case "fontSize": {
				$(this.htmlPlayer).css("font-size",value);
				break;
			}
			case "fontVariant": {
				$(this.htmlPlayer).css("font-variant",value);
				break;
			}
			case "fontWeight": {
				$(this.htmlPlayer).css("font-weight",value);
				break;
			}
			
			// ???
			
			case "explicitDur": {
				var buffer = value.split("s");
				this.explicitDur = parseInt(buffer[0]);
				break;
			}
			case "baseDeviceRegion":
			case "deviceClass":
			case "plan":
			case "player":
			case "playerLife":		// keep/close
			case "reusePlayer": {	// true/false
				// TODO
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"property",[name]);
				break;
			}
			
			// TRANSITION
			
			case "transInBorderColor":
			case "transInBorderWidth":
			case "transInDirection":
			case "transInDur":
			case "transInEndProgress":
			case "transInFadeColor":
			case "transInHorRepeat":
			case "transInStartProgress":
			case "transInSubtype":
			case "transInType":
			case "transInVertRepeat":
			case "transBorderColor":
			case "transOutBorderWidth":
			case "transOutDirection":
			case "transOutDur":
			case "transOutEndProgress":
			case "transOutFadeColor":
			case "transOutHorRepeat":
			case "transOutType":
			case "transOutStartProgress":
			case "transOutSubtype":
			case "transOutVertRepeat": {
				// TODO
				Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"property",[name]);
				break;
			}
			
			// SETTINGS
			
			case "service.currentFocus":
			case "default.focusBorderColor":
			case "default.selBorderColor":
			case "default.focusBorderWidth":
			case "default.focusBorderTransparency": {
				if (this.checkType(["application"])) {
					this.presentation.systemSettings.setPropertyValue(name,value);
				}
			}

		}

	}

}