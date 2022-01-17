function changeSelectedColorOption (e) {
			var color = e.data.util.getLSValue('colors_' + $.single( this ).find(':selected').val());
			e.data.picker.fromString(color);
		}