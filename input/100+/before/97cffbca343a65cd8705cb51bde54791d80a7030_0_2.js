function() {
    var checkProgress = function () {
        var url = $('#selected_progress_url').attr('value');
        var elem = $('#scenario_progress_html'); 
        if (elem.length == 0){ 
            self.triggerDone();
            return false; 
        };
        if (!self.done()) {
            $.get(url, function(data) {
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
                    self.triggerDone();
                }
            })
        }
    }
    if (!app.timer) {
        checkProgress();
        app.timer = setInterval(checkProgress, 5000);
    } else {
        console.log("Warning: app.timer is set and checkTimer was called!");
    }
 }