function() {
            this.$el.html(_.template(this.template, this.model.toJSON(), {variable : 'data'}));
            this.$input = this.$el.find('.sp-input');

            if (!this.$input.is('input')) {
                throw "Skin should contain 'input' HTMLElement.";
            }

            //Apply default settings on the HTML nodes
            this._handleDisabledChange();
        }