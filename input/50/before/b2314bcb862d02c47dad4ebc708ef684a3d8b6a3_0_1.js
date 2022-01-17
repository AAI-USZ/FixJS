function () {
            if (this.opened()) return;
            this.parent.open.apply(this, arguments);
            this.resizeSearch();
            this.focusSearch();
        }