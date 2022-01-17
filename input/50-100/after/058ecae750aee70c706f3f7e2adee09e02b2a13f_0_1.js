function () {
            if (this.opened()) return;

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.updateResults(true);
            this.dropdown.show();
            this.ensureHighlightVisible();
            this.focusSearch();
        }