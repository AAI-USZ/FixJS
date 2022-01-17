function () {
            var val, data = [];

            if (arguments.length === 0) {
                return this.getVal();
            }

            val = arguments[0];

            if (this.select) {
                // val is a list of ids
                this.setVal(val);
                this.select.find(":selected").each(function () {
                    data.push({id: $(this).attr("value"), text: $(this).text()});
                });
                this.updateSelection(data);
            } else {
                val = (val === null) ? [] : val;
                this.setVal(val);
                // val is a list of objects

                $(val).each(function () { data.push(this.id); });
                this.setVal(data);
                this.updateSelection(val);
            }

            this.clearSearch();
        }