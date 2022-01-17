function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                offset = -1, // index of first element without data
                page = this.resultsPage + 1;

            if (more.length === 0) return;

            below = more.offset().top - results.offset().top - results.height();

            if (below <= 0) {
                more.addClass("select2-active");
                this.opts.query({
                        term: this.search.val(),
                        page: page,
                        roundtripValue: self.resultsRoundtripValue,
                        callback: this.bind(function (data) {
                    var parts = [], self = this;
                    $(data.results).each(function () {
                        parts.push("<li class='select2-result'>");
                        parts.push(self.opts.formatResult(this));
                        parts.push("</li>");
                    });
                    more.before(parts.join(""));
                    results.find(".select2-result").each(function (i) {
                        var e = $(this);
                        if (e.data("select2-data") !== undefined) {
                            offset = i;
                        } else {
                            e.data("select2-data", data.results[i - offset - 1]);
                        }
                    });
                    if (data.more) {
                        more.removeClass("select2-active");
                    } else {
                        more.remove();
                    }
                    this.resultsPage = page;
                })});
            }
        }