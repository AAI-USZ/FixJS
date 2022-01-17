function(key, dataset) {
		if (typeof(key) != "string") {
			return;
		}

		var dataSet = TissueStack.dataSetStore.getDataSetById(key);
		if (!dataSet) {
			return;
		}
		
		// for all canvases, unbind the events
		for (var plane in dataSet.planes) {
			dataSet.planes[plane].events.unbindAllEvents();
		}
		dataSet.planes = {};
		
		// restore plane and canvas order to default
		var coll = $("#" + dataset + "_main_view_canvas");
		coll.removeAttr("class");
		coll.addClass("canvasview canvas_y");
		coll = $("#" + dataset + "_main_view_canvas canvas");
		var selectors = [
		                 ["#" + dataset + "_main_view_canvas canvas", "canvas_y_plane"],
		                 ["#" + dataset + "_left_side_view_canvas canvas", "canvas_x_plane"],
		                 ["#" + dataset + "_right_side_view_canvas canvas", "canvas_z_plane"]
		                ];
			for (var i=0;i<selectors.length;i++) {
				coll = $(selectors[i][0]);
				coll.each(function(index) {
				    var id = $(this).attr("id");
				    $(this).attr("id", id.replace(/canvas_[x|y|z]_plane/, selectors[i][1]));
				});
		}

		if(TissueStack.desktop || TissueStack.tablet){
			// restore slider states
			var old_classes = $("#" + dataset + "_canvas_main_slider").attr("class");
			old_classes = old_classes.replace(/canvas_[x|y|z]/, "canvas_y");
			coll = $("#" + dataset + "_canvas_main_slider");
			coll.removeAttr("class");
			coll.addClass(old_classes);

			// restore maximizing states
			$("#" + dataset + "_left_side_view_maximize").attr("class", "maximize_view_icon canvas_x");
			$("#" + dataset + "_right_side_view_maximize").attr("class", "maximize_view_icon canvas_z");
			
			// finally hide everything
		   $('#' + dataset + '_center_point_in_canvas').closest('.ui-btn').hide();
		   $("#" + dataset + ", #" + dataset + "_right_panel").addClass("hidden");
		   $("#" + dataset + "_left_side_view_canvas").addClass("hidden");
		   $("#" + dataset + "_right_side_view_canvas").addClass("hidden");
		}
	}