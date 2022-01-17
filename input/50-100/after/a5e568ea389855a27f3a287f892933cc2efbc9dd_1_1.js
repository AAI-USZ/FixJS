function(ctl, noUndo) {
				val = ctl.value;
				$('#blur').val(val);
				
				var undo = (window.event.type == "mouseup");
				
				if(!undo) {
					svgCanvas.setBlurNoUndo(val);	
				} else {
					svgCanvas.setBlur(val, true);
				}
			}