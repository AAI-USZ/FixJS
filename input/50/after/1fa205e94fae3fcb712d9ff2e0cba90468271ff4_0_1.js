function(){
            me._refreshLine();
            (typeof me.onchange == 'function') && me.onchange();
        }