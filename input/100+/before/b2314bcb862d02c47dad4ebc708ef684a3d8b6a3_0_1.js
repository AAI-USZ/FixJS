function () {
            if (this.opened()) return;
            this.clearPlaceholder();

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");
            if(this.dropdown[0] !== this.body.children().last()[0]) { 
				// ensure the dropdown is the last child of body, so the z-index is always respected correctly
                this.dropdown.detach().appendTo(this.body);
            }
	
            this.dropdown.addClass("select2-drop-active");

            this.positionDropdown();

            this.updateResults(true);
            this.dropdown.show();
            this.ensureHighlightVisible();
            this.focusSearch();
        }