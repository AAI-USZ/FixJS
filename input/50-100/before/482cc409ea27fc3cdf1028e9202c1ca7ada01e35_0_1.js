function () {
            if (!this.opened()) return;

            this.dropdown.hide();
            this.container.removeClass("select2-dropdown-open");
            this.results.empty();
            this.clearSearch();
        }