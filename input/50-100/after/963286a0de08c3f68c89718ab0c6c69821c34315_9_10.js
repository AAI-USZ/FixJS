function(data) {
                    $("#customer").html(data);
                    ($("#customer").innerHeight()-$("#customer table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#customer table").css("width",customerColumnWidth-scr);
                    lists_live_filter('customer', $('#filter_customer').val());
                    lists_write_annotations('customer');
                    if (typeof(callback) != "undefined")
                      callback();
                }