function() {
        var self = this;

        if (self.options.forceOpen) {
            return;
        }

        this._field.blur();

        if (this._editIcon) {
            if (this.options.multiline) {
                this._editIcon.fadeIn();
            } else {
                this._editIcon.show();
            }
        }

        if (this.options.multiline && this._editing) {
            this._field
                .css("overflow", "hidden")
                .animate({
                    height: this.element.height()
                }, 350);
        }

        this._field.queue(function() {
            self.element.show();
            self._form.hide();
            self._field.dequeue();
        });

        this._editing = false;
        // Only update _dirty state after setting _editing to false.
        this._updateDirtyState();
    }