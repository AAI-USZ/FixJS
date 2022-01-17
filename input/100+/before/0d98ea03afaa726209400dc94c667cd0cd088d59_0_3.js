function (data) {
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
                }