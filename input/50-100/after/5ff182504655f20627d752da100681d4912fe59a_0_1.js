function (e) {

                if (self._pasteMetaKeyPressed && (e.which == 91 || e.which == 86))
                    $(this).blur();

                // timeout for the fast copy pasters
                window.setTimeout(function () {
                    self._pasteMetaKeyPressed = e.metaKey;
                }, 250);
            }