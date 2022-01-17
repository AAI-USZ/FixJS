function (data) {
            this.addSelectedChoice(data);
            if (this.select) { this.postprocessResults(); }

            if (this.opts.closeOnSelect) {
                this.close();
                this.search.width(10);
            } else {
                this.search.width(10);
                this.resizeSearch();

                if (this.countSelectableResults()>0) {
                    this.positionDropdown();
                } else {
                    // if nothing left to select close
                    this.close();
                }
            }

            // since its not possible to select an element that has already been
            // added we do not need to check if this is a new element before firing change
            this.triggerChange({ added: data });

            this.focusSearch();
        }