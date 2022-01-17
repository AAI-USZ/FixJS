function(ev){
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
    }