function(e) {
            e.preventDefault();
            hideSource = 'button';
            div.modal("hide");
            var handler = $(this).data("handler");
            var cb = callbacks[handler];
            if (typeof cb == 'function') {
                cb();
            }
        }