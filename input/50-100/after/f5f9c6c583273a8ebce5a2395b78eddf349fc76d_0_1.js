function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.$input = this.$el.find('.sp-input');

            if (!this.$input.is('input')) {
                throw "Skin should contain 'input' HTMLElement.";
            }

            //Apply default settings on the HTML nodes
            this._handleDisabledChange();
        }