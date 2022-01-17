function () {
                wrap.find('.g_metricrow').each(function () {
                    var metric = $(this);
                    update_metric_row(metric);
                });
                get_events(wrap.find(id('eventdesc', graph)), id('eventcount', graph))
                render();
            }