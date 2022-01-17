function (e, data) {

                    var link = $(data.rslt.obj).find('a:first');

                    $(this).trigger('link_selected.' + self.widgetName, [link]);

                    if (data.rslt.e) { // User clicked the link, not just tree initialization

                        window.location = link.attr('href');

                    }

                }