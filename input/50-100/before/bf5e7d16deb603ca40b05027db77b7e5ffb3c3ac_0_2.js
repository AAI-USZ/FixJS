function (data) {
            var old = this.opts.element.val();

            this.opts.element.val(data.id);
            this.updateSelection(data);
            this.close();
            this.selection.focus();

            if (!equal(old, data.id)) { this.triggerChange(); }
        }