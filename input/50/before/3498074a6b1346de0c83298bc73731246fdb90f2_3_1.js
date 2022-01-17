function _setEnabled(enabled) {
        _enabled = enabled;
        
        $(exports).triggerHandler("enabledChanged", _enabled);
        
        _updateListeners();
        
        _prefs.setValue("enabled", _enabled);
    
        // run immediately
        run();
    }