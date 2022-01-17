function(params) {
            if (!params) {
                params = {modifyModel: true};
            }
            if (this._highlighted) {
                this._highlighted.$node.removeClass('highlight');
                if (this.options.highlightableGridModelField && params.modifyModel) {
                    this._highlighted.options.model.set(
                        this.options.highlightableGridModelField, false);
                }
                delete this._highlighted;
                this.trigger('unhighlight');
            }
            return this;
        }