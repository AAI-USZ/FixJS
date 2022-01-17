function () {
            this.parent.cancel.apply(this, arguments);
            this.container.focus();
        }