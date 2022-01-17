function (data) {
            var choice,
            id = this.id(data),

            parts = ["<li class='select2-search-choice'>",
                "<span class='select2-tmp'></span>",
                "<a href='javascript:void(0)' class='select2-search-choice-close' tabindex='-1'></a>",
                "</li>"
            ],
            val = this.getVal();

            choice = $(parts.join(""));

            choice.find('.select2-tmp').replaceWith(this.opts.formatSelection(data));
            choice.find(".select2-search-choice-close")
                .bind("click dblclick", this.bind(function (e) {
                if (!this.enabled) return;

                this.unselect($(e.target));
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                killEvent(e);
                this.close();
                this.focusSearch();
            })).bind("focus", this.bind(function () {
                if (!this.enabled) return;
                this.container.addClass("select2-container-active");
                this.dropdown.addClass("select2-drop-active");
            }));

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        }