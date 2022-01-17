function(value) {
            var data;

            if (arguments.length === 0) {
                data = this.selection.data("select2-data");
                if (data == undefined) data = null;
                return data;
            } else {
                if (!value || value === "") {
                    this.clear();
                } else {
                    this.opts.element.val(!value ? "" : this.id(value));
                    this.updateSelection(value);
                }
            }
        }