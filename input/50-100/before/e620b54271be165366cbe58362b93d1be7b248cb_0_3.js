function (data) {
            var old = this.opts.element.val();

            this.opts.element.val(this.id(data));
            this.updateSelection(data);
            this.close();
            this.container.focus();

            if (!equal(old, this.id(data))) { this.triggerChange(); }
        }