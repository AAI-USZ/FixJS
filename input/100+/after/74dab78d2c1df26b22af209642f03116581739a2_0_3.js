function () {
            var val, data = null;

            if (arguments.length === 0) {
                return this.opts.element.val();
            }

            val = arguments[0];

            if (this.select) {
                // val is an id
                this.select
                    .val(val)
                    .find(":selected").each2(function (i, elm) {
                        data = {id: elm.attr("value"), text: elm.text()};
                        return false;
                    });
                this.updateSelection(data);
            } else {
                // val is an object. !val is true for [undefined,null,'']
                this.opts.element.val(!val ? "" : this.id(val));
                this.updateSelection(val);
            }
            this.setPlaceholder();
            this.triggerChange();
        }