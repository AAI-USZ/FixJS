function () {
            this.parent.cancel.apply(this, arguments);
            this.search.focus();
        }