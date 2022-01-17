function (data) {

                    self.opts.populateResults(results, data.results);

                    if (data.more===true) {
                        more.detach();
                        results.children().filter(":last").append(more);
                        more.removeClass("select2-active");
                    } else {
                        more.remove();
                    }
                    self.resultsPage = page;
                }