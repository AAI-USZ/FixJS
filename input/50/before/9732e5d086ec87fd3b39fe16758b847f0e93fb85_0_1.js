function(i) {
        var node = commandKeys.getBookmark(i);
        if (node) {
            PlacesUIUtils.openNodeIn(node, "current", window);
        }
    }