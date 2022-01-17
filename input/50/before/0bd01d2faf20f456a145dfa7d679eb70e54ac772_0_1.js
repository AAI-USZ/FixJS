function() {
        var state = GeoExplorer.superclass.getState.apply(this, arguments);
        // Don't persist tools
        delete state.tools;
        return state;
    }