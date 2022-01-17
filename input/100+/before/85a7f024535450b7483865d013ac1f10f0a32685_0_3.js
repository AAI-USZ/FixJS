function (pane, open_only) {
                var max = '50%', min = $('.OG-layout-analytics-' + pane + ' .OG-gadget-tabs').height(),
                    minimize = function () {
                        og.views.common.layout.inner.sizePane(pane, min);
                        $('.OG-layout-analytics-' + pane + ' .og-js-toggle')
                            .toggleClass('og-icon-minimize og-icon-maximize');
                    },
                    maximize = function () {
                        og.views.common.layout.inner.sizePane(pane, max);
                        $('.OG-layout-analytics-' + pane + ' .og-js-toggle')
                            .toggleClass('og-icon-minimize og-icon-maximize');
                    };
                og.views.common.layout.inner.state[pane].size === min
                        ? maximize()
                        : open_only ? null : minimize();
            }