function (e) {
                if (!this.enabled) return;
                this.clearPlaceholder();
                this.open();
                this.focusSearch();
                e.preventDefault();
            }