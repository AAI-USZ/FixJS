function createColorPicker (eleID) {
			// Create color picker
			var picker = new jscolor.color(document.getElementById(eleID), {});
			picker.hash = true;
			picker.pickerFace = 5;
			picker.pickerInsetColor = 'black';
			
			// Store a reference to the color picker
			$('#' + eleID).data('picker', picker);
			
			return picker;
		}