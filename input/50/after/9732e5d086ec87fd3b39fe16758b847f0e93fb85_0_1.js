function(i) {
        var node = commandKeys.getBookmark(i);
        if (node) {
            PlacesUIUtils._openNodeIn(node, "current", window);
        }
    }