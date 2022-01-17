function () {
            this.close();
            this.container.removeClass("select2-container-active");
            this.dropdown.removeClass("select2-drop-active");
            if (this.search.is(":focus")) { this.search.blur(); }
            this.clearSearch();
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
        }