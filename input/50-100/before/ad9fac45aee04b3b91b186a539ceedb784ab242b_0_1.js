function(value) {
            if (arguments.length === 0) {
                return this.selection.data("select2-data");
            } else {
                if (!value || value === "") {
                    this.clear();
                } else {
                    this.opts.element.val(!value ? "" : this.id(value));
                    this.updateSelection(value);
                }
            }
        }