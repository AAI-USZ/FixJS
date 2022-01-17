function () {
            this.parent.cancel.apply(this, arguments);
            this.selection.focus();
        }