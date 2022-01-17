function updateMoveDown(el) {
            var isLast = this.isLast();
            if (isLast && !this._updating &&
            this.previousSibling &&
            this.previousSibling.hidden === false) {
                this._updating = true; // avoid recursion
                var previous = this.previousSibling;
                if (previous) {
                    this.ownerTree.actionsPlugin.updateActions(previous);
                }
                delete this._updating;
            }
            if (isLast) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }