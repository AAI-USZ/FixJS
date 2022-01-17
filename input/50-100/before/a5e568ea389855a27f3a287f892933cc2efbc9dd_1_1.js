function(ctl, noUndo) {
				val = ctl.value;
				$('#blur').val(val);
				var complete = false;
				if(!ctl || !ctl.handle) {
					$('#blur_slider').slider('option', 'value', val);
					complete = true;
				}
				if(noUndo) {
					svgCanvas.setBlurNoUndo(val);	
				} else {
					svgCanvas.setBlur(val, complete);
				}
			}