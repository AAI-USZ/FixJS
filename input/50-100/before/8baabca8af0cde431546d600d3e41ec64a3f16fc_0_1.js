function(data) {
                timelineData(data);

                cb();
                showTimeline();
                if (shouldHideTimeline()) {
                    setTimeout(hideTimeline, 2000);
                }
            }