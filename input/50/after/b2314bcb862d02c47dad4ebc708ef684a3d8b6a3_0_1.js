function () {
            if (this.opened()) return;
            this.parent.open.apply(this, arguments);
			this.clearPlaceholder();
			this.resizeSearch();
            this.focusSearch();
        }