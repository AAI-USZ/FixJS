function constructWidgets() {
	var graphWidgets = document.querySelectorAll('.graph-widget'); 
	var i = 0;
    for (i = 0; i < graphWidgets.length; i++) {
		var widgetElement = graphWidgets[i];
		var widgetName = $.trim(widgetElement.id);
		var widgetConfig = config.widgets[widgetName];

		graphs[i] = new GraphWidget({
			name: widgetName,
			config: widgetConfig,
			element: widgetElement
		});
	}
}