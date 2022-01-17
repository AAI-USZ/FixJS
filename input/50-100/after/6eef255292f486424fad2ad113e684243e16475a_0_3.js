function(e,t) {
        t = t.id.replace(/-toggle/,'');
        var ed = tinyMCE.get(t);
        if (ed) {
            ed.isHidden() ? ed.show() : ed.hide();
        }
    }