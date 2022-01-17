function(el, dir){
        clearProc();
        proc.el = el;
        proc.dir = dir;
        proc.id = setInterval(doScroll, Roo.dd.ScrollManager.frequency);
    }