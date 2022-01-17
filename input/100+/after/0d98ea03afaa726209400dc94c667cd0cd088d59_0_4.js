function (initial) {
            var search = this.search, results = this.results, opts = this.opts, self=this;

            search.addClass("select2-active");

            function render(html) {
                results.html(html);
                results.scrollTop(0);
                search.removeClass("select2-active");
            }

            if (search.val().length < opts.minimumInputLength) {
                render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>");
                return;
            }

            this.resultsPage = 1;
            opts.query({
                    term: search.val(),
                    page: this.resultsPage,
                    roundtripValue: null,
                    callback: this.bind(function (data) {
                var parts = [], // html parts
                    def; // default choice

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

                $(data.results).each(function () {
                    parts.push("<li class='select2-result'>");
                    parts.push(opts.formatResult(this));
                    parts.push("</li>");
                });

                if (data.more === true) {
                    parts.push("<li class='select2-more-results'>Loading more results...</li>");
                }

                render(parts.join(""));
                results.children(".select2-result").each(function (i) {
                    var d = data.results[i];
                    $(this).data("select2-data", d);
                });
                this.postprocessResults(data, initial);
            })});
        }