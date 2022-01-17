function (data) {
            var choice=$("<li class='select2-search-choice'></li>"),
                id = this.id(data),
                val = this.getVal(),
                formatted;

            choice.find('.select2-tmp').replaceWith(this.opts.formatSelection(data));

            formatted=this.opts.formatSelection(data, choice);
            if (formatted !== undefined) {
                choice.append(formatted);
            }

            choice.append("<a href='javascript:void(0)' class='select2-search-choice-close' tabindex='-1'></a>");

            choice.find(".select2-search-choice-close")
                .bind("click dblclick", this.bind(function (e) {
                if (!this.enabled) return;

                $(e.target).closest(".select2-search-choice").fadeOut('fast').animate({width: "hide"}, 50, this.bind(function(){
                    this.unselect($(e.target));
                    this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                    this.close();
                    this.focusSearch();
                })).dequeue();
                killEvent(e);
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