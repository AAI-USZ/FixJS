function () {
            var data = this.results.find(".select2-highlighted").not(".select2-disabled").closest('.select2-result-selectable').data("select2-data");
            if (data) {
                this.onSelect(data);
            }
        }