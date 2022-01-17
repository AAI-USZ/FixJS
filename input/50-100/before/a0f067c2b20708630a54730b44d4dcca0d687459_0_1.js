function () {
            if (this.opened()) return;

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");
            this.dropdown.detach().appendTo(this.opts.element.parents("body")).addClass("select2-drop-active");

            this.positionDropdown();

            this.updateResults(true);
            this.dropdown.show();
            this.ensureHighlightVisible();
            this.focusSearch();
        }