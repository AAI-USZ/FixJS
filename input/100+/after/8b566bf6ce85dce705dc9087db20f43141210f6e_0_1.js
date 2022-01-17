function (data, initial) {
            var selected = 0, self = this, showSearchInput = true;

            // find the selected element in the result list

            this.results.find(".select2-result").each2(function (i, elm) {
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            });

            // and highlight it

            this.highlight(selected);

            // hide the search box if this is the first we got the results and there are a few of them

            if (initial === true) {
                // TODO below we use data.results.length, but what we really need is something recursive to calc the length
                // TODO in case there are optgroups
                showSearchInput = this.showSearchInput = data.results.length >= this.opts.minimumResultsForSearch;
                this.dropdown.find(".select2-search")[showSearchInput ? "removeClass" : "addClass"]("select2-search-hidden");

                //add "select2-with-searchbox" to the container if search box is shown
                $(this.dropdown, this.container)[showSearchInput ? "addClass" : "removeClass"]("select2-with-searchbox");
            }

        }