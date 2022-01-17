function (e) {
                if (!this.enabled || e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                    return;
                }
                this.open();
                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN || e.which === KEY.SPACE) {
                    // prevent the page from scrolling
                    killEvent(e);
                }
                if (e.which === KEY.ENTER) {
                    // do not propagate the event otherwise we open, and propagate enter which closes
                    killEvent(e);
                }
            }