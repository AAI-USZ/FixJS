function(data) {
                    $("#user").html(data);
                    ($("#user").innerHeight()-$("#user table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#user table").css("width",customerColumnWidth-scr);
                    lists_live_filter('user', $('#filt_user').val());
		    lists_write_annotations('user');
                    if (typeof(callback) != "undefined")
                      callback();
                }