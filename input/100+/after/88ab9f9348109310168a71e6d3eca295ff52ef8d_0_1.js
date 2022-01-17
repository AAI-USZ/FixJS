function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                offset = -1, // index of first element without data
                page = this.resultsPage + 1,
                self=this,
                term=this.search.val(),
                context=this.context;

            if (more.length === 0) return;
            below = more.offset().top - results.offset().top - results.height();

            if (below <= 0) {
                more.addClass("select2-active");
                this.opts.query({
                        term: this.search.val(),
                        page: page,
                        context: this.context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function (data) {

                    self.opts.populateResults(results, data.results, {term: term, page: page, context:context});

                    if (data.more===true) {
                        more.detach();
                        results.children().filter(":last").append(more);
                        more.removeClass("select2-active");
                    } else {
                        more.remove();
                    }
                    self.resultsPage = page;
                })});
            }
        }