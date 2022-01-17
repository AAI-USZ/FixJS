function (data) {
                var def; // default choice

                this.preprocessResults(data,initial);

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
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});

                if (data.more === true) {
                    results.children().filter(":last").append("<li class='select2-more-results'>" + opts.formatLoadMore(this.resultsPage) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                }

                if (this.opts.formatExtra && search.val() !== "") {
                    results.children().filter(":last").append("<li class='select2-extra'>" + opts.formatExtra(search.val()) + "</li>");
                }

                this.postprocessResults(data, initial);

                postRender();
            }