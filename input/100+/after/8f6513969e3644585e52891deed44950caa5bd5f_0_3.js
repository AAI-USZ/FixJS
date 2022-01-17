function (data) {
                var def; // default choice

                // save context, if any
                this.context = (data.context===undefined) ? null : data.context;

                // create a default choice and prepend it to the list
                if (this.opts.createSearchChoice && search.val() !== "") {
                    def = this.opts.createSearchChoice.call(null, search.val(), data.results);
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
                        if ($(data.results).filter(
                            function () {
                                return equal(self.id(this), self.id(def));
                            }).length === 0) {
                            data.results.unshift(def);
                        }
                    }
                }

                if (data.results.length === 0) {
                    render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>");
                    return;
                }

                results.empty();
                self.opts.populateResults(results, data.results, {term: search.val(), page: this.resultsPage, context:null});
                postRender();

                if (data.more === true) {
                    results.children().filter(":last").append("<li class='select2-more-results'>" + opts.formatLoadMore(this.resultsPage) + "</li>");
                }

                this.postprocessResults(data, initial);
            }