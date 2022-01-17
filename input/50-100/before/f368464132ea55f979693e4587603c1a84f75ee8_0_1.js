function (val) {
            var unique = [];
            if (this.select) {
                this.select.val(val);
            } else {
                // filter out duplicates
                $(val).each(function () {
                    if (indexOf(this, unique) < 0) unique.push(this);
                });

                this.opts.element.val(unique.length === 0 ? "" : unique.join(","));
            }
        }