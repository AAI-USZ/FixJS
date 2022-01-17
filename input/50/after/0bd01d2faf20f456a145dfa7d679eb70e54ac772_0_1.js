function() {
        var state = GeoExplorer.superclass.getState.apply(this, arguments);
        // Don't persist tools
        delete state.tools;
        delete state.map.controls;
        return state;
    }