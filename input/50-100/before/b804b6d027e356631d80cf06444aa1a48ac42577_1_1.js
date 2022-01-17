function() {
        var id = '_smokescreen_',
            el = document.getElementById(id);
        if (el === null) {
            el = document.createElement('div');
            el.setAttribute('id',id);
            el.style.cssText='position:fixed;top:0px;left:0px;'+
                             'height:100%;width:100%;'+
                             'background:#EEE;opacity:.4;' +
                             'z-index:999;display:none';
            document.body.appendChild(el);
        }
        if (el.style.display === 'block') {
            el.style.display = 'none';
        }
        else {
            el.style.display = 'block';
        }
    }