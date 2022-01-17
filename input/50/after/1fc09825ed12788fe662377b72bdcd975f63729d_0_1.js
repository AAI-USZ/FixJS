function postRender() {
                results.scrollTop(0);
                search.removeClass("select2-active");
                if (initial !== true) self.positionDropdown();
            }