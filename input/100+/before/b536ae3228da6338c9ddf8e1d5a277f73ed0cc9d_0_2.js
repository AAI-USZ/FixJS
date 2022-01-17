function (e) {
            var code = e.keyCode || e.which;
            if (code  === 40 && e.shiftKey) {
                that.navigator.next();
            }
            if (code  === 38 && e.shiftKey) {
                that.navigator.previous();
            }
            if (code  === 39 && e.shiftKey) {
                that.navigator.next_chapter();
            }
            if (code  === 37 && e.shiftKey) {
                that.navigator.previous_chapter();
            }
            if (code  === 65 && e.altKey) {
                that.editor.attachEditor();
            }
        }