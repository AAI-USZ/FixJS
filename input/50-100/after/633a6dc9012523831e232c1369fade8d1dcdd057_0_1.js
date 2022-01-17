function () {
            var index=this.highlight(),
                highlighted=this.results.find(".select2-highlighted").not(".select2-disabled"),
                data = highlighted.closest('.select2-result-selectable').data("select2-data");
            if (data) {
                highlighted.addClass("select2-disabled");
                this.highlight(index);
                this.onSelect(data);
            }
        }