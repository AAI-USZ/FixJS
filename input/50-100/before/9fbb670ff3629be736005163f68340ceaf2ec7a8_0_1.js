function(data) {
                self.progressHtml(data.html);
                var pct = parseInt((data.complete / data.total) * 100.0, 10);
                self.progressBarWidth(pct + "%");
                if (pct >= 100) {
                    self.triggerDone();
                }
            }