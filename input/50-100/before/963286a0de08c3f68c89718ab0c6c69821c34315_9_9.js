function(data) {
                    $("#usr").html(data);
                    ($("#usr").innerHeight()-$("#usr table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#usr table").css("width",knd_w-scr);
                    lists_live_filter('usr', $('#filt_usr').val());
		    lists_write_annotations('usr');
                    if (typeof(callback) != "undefined")
                      callback();
                }