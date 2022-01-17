function _setEnabled(enabled) {
        _enabled = enabled;
        _updateListeners();
        _prefs.setValue("enabled", _enabled);
    
        // run immediately
        run();
    }