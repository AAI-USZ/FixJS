function(e) {
            var handler   = $(this).data("handler"),
                cb        = callbacks[handler],
                hideModal = null;

            if (typeof cb == 'function') {
                hideModal = cb();
            }
            if (hideModal !== false){
                e.preventDefault();
                hideSource = 'button';
                div.modal("hide");
            }
        }