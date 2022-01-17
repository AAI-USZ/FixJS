function(window, document, undefined){

    var activeKeys = [];

    var identifyKey = function(ev){
        var code, key;
        if (ev.wich) {
            code = ev.which;
        }
        else if (ev.keyCode)
        {
            code = ev.keyCode;
        }
        else
        {
            return;
        }

        switch (code)
        {
            case 16:
                key = 'SHIFT';
                break;
            case 17:
                key = 'CTRL';
                break;
            case 18:
                key = 'ALT';
                break;
            default:
                key = String.fromCharCode(code);
        }

        return key;
    };

    var isKeyActive = function(key)
    {
        return (activeKeys.indexOf(key) >= 0);
    };

    window.addEventListener('keydown', function(ev){
        var key = identifyKey(ev);
        
        if (isKeyActive(key)) {
            return;
        }

        activeKeys.push(key);
    });

    window.addEventListener('keyup', function(ev){
        var key = identifyKey(ev);
        var idx = activeKeys.indexOf(key);

        if (idx >= 0) {
            activeKeys.splice(idx, 1);
        }
    });

    return {
        getActiveKeys: function() {
            return activeKeys;
        }
    };
}