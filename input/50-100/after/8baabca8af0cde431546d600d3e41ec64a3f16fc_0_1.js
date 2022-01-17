function(data) {
                timelineData(data);

                cb();
                showTimeline();
                if (shouldHideTimeline()) {
                    setTimeout(hideTimeline, 2000);
                }
                $('#page-inner,#footer').anim({opacity:1},.6,'ease-in');
            }