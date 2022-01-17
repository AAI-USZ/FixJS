function (data) {
            var choice,
                id = data.id,
                parts,
                val = this.getVal();

            parts = ["<li class='select2-search-choice'>",
                this.opts.formatSelection(data),
                "<a href='javascript:void(0)' class='select2-search-choice-close' tabindex='-1'></a>",
                "</li>"
            ];

            choice = $(parts.join(""));
            choice.find("a")
                .bind("click dblclick", this.bind(function (e) {
                this.unselect($(e.target));
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                killEvent(e);
                this.close();
                this.focusSearch();
            })).bind("focus", this.bind(function () {
                this.container.addClass("select2-container-active");
            }));

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        }