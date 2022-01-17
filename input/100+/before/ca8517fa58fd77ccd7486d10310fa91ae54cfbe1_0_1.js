function(e) {
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13 && d.queryCommandValue('strikethrough')=='true') {
                d.execCommand('strikethrough', false, null);
            }
        }