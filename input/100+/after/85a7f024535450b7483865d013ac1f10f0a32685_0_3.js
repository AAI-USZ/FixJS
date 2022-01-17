function (pane, open_only) {
                    var max = '50%', min = $('.OG-layout-analytics-' + pane + ' .OG-gadget-tabs').height(),
                        minimize = layout.sizePane.partial(pane, min),
                        maximize = layout.sizePane.partial(pane, max);
                    layout.state[pane].size === min
                        ? maximize()
                        : open_only ? null : minimize();
                }