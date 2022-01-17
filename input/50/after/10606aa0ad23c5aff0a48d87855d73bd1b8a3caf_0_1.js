function loadWidgets(activeWidgetInfos) {
        for (var i=0; i<activeWidgetInfos.length; i++) {
            var widgetInfo = activeWidgetInfos[i];
            loadWidget(widgetInfo);
        };
    }