function () {
            if (this.parent.open.apply(this, arguments) === false) return false;

            this.clearPlaceholder();
			this.resizeSearch();
            this.focusSearch();
            return true;
        }