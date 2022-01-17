function loadWidgets(activeWidgets) {
        for (var i=0; i<activeWidgets.length; i++) {
            var manifest = activeWidgets[i];
            loadWidget(manifest);
        };
    }