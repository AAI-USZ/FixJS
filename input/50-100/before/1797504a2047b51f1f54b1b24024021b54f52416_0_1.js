function() {
            if (this._highlighted) {
                this._highlighted.$node.removeClass('highlight');
                if (this.options.highlightableGridModelField) {
                    this._highlighted.options.model.set(
                        this.options.highlightableGridModelField, false);
                }
                delete this._highlighted;
                this.trigger('unhighlight');
            }
            return this;
        }