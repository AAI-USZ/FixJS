function(ev){
        var key = identifyKey(ev);
        var idx = activeKeys.indexOf(key);

        if (idx >= 0) {
            activeKeys.splice(idx, 1);
        }
    }