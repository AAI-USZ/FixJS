function(data) { 
                    $("#xp").html(data);
                
                    // set zef table width
                    ($("#xp").innerHeight()-$("#xp table").outerHeight() > 0 ) ? scr=0 : scr=scroller_width; // width of zef table depending on scrollbar or not
                    $("#xp table").css("width",xp_w-scr);
                    // stretch customer column in faked zef table head
                    $("#xp_head > table > tbody > tr > td.knd").css("width", $("div#xp > div > table > tbody > tr > td.knd").width());
                    // stretch project column in faked zef table head
                    $("#xp_head > table > tbody > tr > td.pct").css("width", $("div#xp > div > table > tbody > tr > td.pct").width());
                xp_ext_resize();
                }