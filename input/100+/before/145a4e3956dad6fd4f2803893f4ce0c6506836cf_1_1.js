function(index) {
		if (typeof(index) != "number") {
			return;
		}
		if (TissueStack.desktop && (index < 0 || index > 2)) {
			return;
		}
		if (TissueStack.tablet || TissueStack.phone) {
			index = 1;
		}

		$("#canvas_point_x,#canvas_point_y,#canvas_point_z").removeAttr("disabled");
		$("#dataset_" + index + ", #dataset_" + index + "_right_panel").removeClass("hidden");
		$('#dataset_' + index + '_center_point_in_canvas').closest('.ui-btn').show();
	}