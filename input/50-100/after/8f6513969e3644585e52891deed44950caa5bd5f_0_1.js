function (data) {

                    self.opts.populateResults(results, data.results, {term: term, page: page, context:context});

                    if (data.more===true) {
                        more.detach();
                        results.children().filter(":last").append(more);
                        more.removeClass("select2-active");
                    } else {
                        more.remove();
                    }
                    self.resultsPage = page;
                }