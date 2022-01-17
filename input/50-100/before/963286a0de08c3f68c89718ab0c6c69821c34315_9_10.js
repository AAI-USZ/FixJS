function(data) {
                    $("#knd").html(data);
                    ($("#knd").innerHeight()-$("#knd table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#knd table").css("width",knd_w-scr);
                    lists_live_filter('knd', $('#filt_knd').val());
                    lists_write_annotations('knd');
                    if (typeof(callback) != "undefined")
                      callback();
                }