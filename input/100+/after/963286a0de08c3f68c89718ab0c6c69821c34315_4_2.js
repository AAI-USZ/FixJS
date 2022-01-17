function(data) { 
                    $("#xp").html(data);
                
                    // set export table width
                    ($("#xp").innerHeight()-$("#xp table").outerHeight() > 0 ) ? scr=0 : scr=scroller_width; // width of export table depending on scrollbar or not
                    $("#xp table").css("width",export_width-scr);
                    // stretch customer column in faked export table head
                    $("#export_head > table > tbody > tr > td.customer").css("width", $("div#xp > div > table > tbody > tr > td.customer").width());
                    // stretch project column in faked export table head
                    $("#export_head > table > tbody > tr > td.project").css("width", $("div#xp > div > table > tbody > tr > td.project").width());
                export_extension_resize();
                }