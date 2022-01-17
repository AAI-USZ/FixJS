function (e) {
                if (!this.enabled) return;
                this.open();
                this.focusSearch();
                e.preventDefault();
            }