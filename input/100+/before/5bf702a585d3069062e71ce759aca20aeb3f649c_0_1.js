function(e) {
            form.isNoteDirty.value=1;
            var code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13 && d.queryCommandValue('strikethrough')=='true') {
                d.execCommand('strikethrough', false, null);
            }
            $(d).unbind('keydown'); // so binding works repeatedly
        }