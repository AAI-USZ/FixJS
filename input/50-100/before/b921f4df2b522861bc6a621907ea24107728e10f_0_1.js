function updateMoveUp(el) {
            var isFirst = this.isFirst();
            if (isFirst && !this._updating &&
            this.nextSibling &&
            this.nextSibling.hidden === false) {
                this._updating = true; // avoid recursion
                var next = this.nextSibling;
                if (next) {
                    this.ownerTree.actionsPlugin.updateActions(next);
                }
                delete this._updating;
            }
            if (isFirst) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        }