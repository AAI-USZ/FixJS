function() {
        var off  = dlg.offset(),
            top  = off.top,
            left = off.left;
        if (top < 0) {
            top = 0;
        }
        else if (top + dlg.outerHeight() > window.innerHeight) {
            top = window.innerHeight - dlg.outerHeight();
        }
        if (left < 0) {
            left = 0;
        }
        else if (left + dlg.outerWidth() > window.innerWidth) {
            left = window.innerWidth - dlg.outerWidth();
        }
        if (top !== off.top || left !== off.left) {
            dlg.dialog({ position: [top, left] });
        }

        resize_contents();
    }