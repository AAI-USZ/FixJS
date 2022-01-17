function (datasets){	
		if (TissueStack.phone) {
			return;
		}
		
		if (typeof(datasets) != "number") {
			datasets = 0;
		}
		
		if (datasets > 2) {
			datasets = 2;
		}

		// we hide everything if there are no data sets selected
		if (datasets == 0) {
		   // clear input fields
		   $("#canvas_point_x,#canvas_point_y,#canvas_point_z").attr("value", "");
		   $("#canvas_point_x,#canvas_point_y,#canvas_point_z").attr("disabled", "disabled");
		   // hide everything
		   $('#dataset_1_center_point_in_canvas, #dataset_2_center_point_in_canvas').closest('.ui-btn').hide();
		   $(".dataset, .right_panel").addClass("hidden");
		   return;
		}
		
		// get screen dimensions
		var screenWidth = $(window).width();
		var screenHeight = $(window).height();
		
		// get the height of the menu header
		var menuHeight = $('#menu_header').height();
		// define some tolerance span
		var widthTolerance = Math.floor(screenWidth * 0.05);
		var heightTolerance = Math.floor(screenWidth * 0.0175);
		
		// get the width of the left panel 
		var leftPanelWidth = Math.floor(screenWidth * 0.15);
		var leftPanelHeight = screenHeight - menuHeight;
		var rightPanelWidth = Math.floor(screenWidth * 0.05);
		
		TissueStack.canvasDimensions = {width: (screenWidth - leftPanelWidth - rightPanelWidth - widthTolerance), height: Math.floor(leftPanelHeight / datasets) -  heightTolerance};
		leftPanelHeight -=  heightTolerance;
		
		$('.left_panel').css({"width" : leftPanelWidth, "height": leftPanelHeight});
		$('.right_panel').css({"width" : rightPanelWidth, "height": TissueStack.canvasDimensions.height});
		$(".ui-slider-vertical").height(TissueStack.canvasDimensions.height - heightTolerance);
		$(".ui-slider-horizontal").height(TissueStack.canvasDimensions.height - heightTolerance);

		if (TissueStack.desktop) {
			var treeHeight = 
				leftPanelHeight - 
				$("#canvas_extent").height() - $("#canvas_point_x").height() * 8 - $("#dataset_1_center_point_in_canvas").height() * (datasets == 2 ? 5 : 4);
			$("#treedataset").css({"height": treeHeight});
		}

		$('.dataset').css({"width" : TissueStack.canvasDimensions.width, "height" : TissueStack.canvasDimensions.height});
		for (var x=1;x<=datasets;x++) {
			$('#dataset_' + x + '_main_view_canvas').css({"width" : TissueStack.canvasDimensions.width, "height" : TissueStack.canvasDimensions.height});
			$('#dataset_' + x + '_main_view_canvas canvas').attr("width", TissueStack.canvasDimensions.width);
			$('#dataset_' + x + '_main_view_canvas canvas').attr("height", TissueStack.canvasDimensions.height);
		}

		// apply screen and canvas size changes
		var sideCanvasDims = {width: Math.floor(TissueStack.canvasDimensions.width * 0.3), height: Math.floor(TissueStack.canvasDimensions.height * 0.2)};
		$('.left_side_view').css({"width" : sideCanvasDims.width, "height" : sideCanvasDims.height});
		$('.right_side_view').css({"width" : sideCanvasDims.width, "height" : sideCanvasDims.height});
		$('.left_side_view canvas').attr("width", sideCanvasDims.width);
		$('.left_side_view canvas').attr("height", sideCanvasDims.height);
		$('.right_side_view canvas').attr("width", sideCanvasDims.width);
		$('.right_side_view canvas').attr("height", sideCanvasDims.height);
	}