function () {
            /* we do this in a timeout so that current event processing can complete before this code is executed.
             this allows tab index to be preserved even if this code blurs the textfield */
            window.setTimeout(this.bind(function () {
                this.close();
                this.container.removeClass("select2-container-active");
                this.dropdown.removeClass("select2-drop-active");
                this.clearSearch();
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                this.search.blur();
            }), 10);
        }