function () {
            this.parent.opening.apply(this, arguments);

            this.clearPlaceholder();
			this.resizeSearch();
            this.focusSearch();
        }