function (e) {
                if (!this.enabled) return;
                this.clear();
                killEvent(e);
                this.close();
                this.triggerChange();
                this.container.focus();
            }