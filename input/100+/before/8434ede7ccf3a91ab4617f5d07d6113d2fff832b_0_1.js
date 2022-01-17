function(data) {
                self.progressHtml(data.html);
                if (data.error == 1) {
                    self.error(true);
                    // stop timer without declaring done
                    clearInterval(app.timer);
                    app.timer = null;
                }
                var pct = parseInt((data.complete / data.total) * 100.0, 10);
                self.progressBarWidth(pct + "%");
                if (pct >= 100) {
                    uid = app.scenarios.viewModel.selectedFeature().uid();
                    self.triggerDone(uid);
                }
            }