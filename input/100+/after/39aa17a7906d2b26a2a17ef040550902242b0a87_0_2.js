function() {
            this.clearDropdownAlignmentPreference();

            if (this.search.val() === " ") { this.search.val(""); }

            this.dropdown.addClass("select2-drop-active");
            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.updateResults(true);

            if(this.dropdown[0] !== this.body().children().last()[0]) {
                this.dropdown.detach().appendTo(this.body());
            }

            this.dropdown.show();
            this.ensureHighlightVisible();
            this.focusSearch();

        }