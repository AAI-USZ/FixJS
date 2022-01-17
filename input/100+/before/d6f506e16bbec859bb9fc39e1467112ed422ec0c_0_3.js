function (data) {

            this.selection.data("select2-data", data);

            this.selection
                .find("span")
                .empty().append(this.opts.formatSelection(data));

            this.selection.removeClass("select2-default");

            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
                this.selection.find("abbr").show();
            }
        }