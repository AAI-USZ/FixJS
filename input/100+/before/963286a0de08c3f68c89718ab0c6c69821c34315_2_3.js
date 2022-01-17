function(data) { 
                    $("#exp").html(data);
                
                    // set exp table width
                    ($("#exp").innerHeight()-$("#exp table").outerHeight() > 0 ) ? scr=0 : scr=scroller_width; // width of exp table depending on scrollbar or not
                    $("#exp table").css("width",exp_w-scr);
                    // stretch refundable column in faked exp table head
                    $("#exp_head > table > tbody > tr > td.refundable").css("width", $("div#exp > div > table > tbody > tr > td.refundable").width());
                    // stretch customer column in faked exp table head
                    $("#exp_head > table > tbody > tr > td.knd").css("width", $("div#exp > div > table > tbody > tr > td.knd").width());
                    // stretch project column in faked exp table head
                    $("#exp_head > table > tbody > tr > td.pct").css("width", $("div#exp > div > table > tbody > tr > td.pct").width());
                    exp_ext_applyHoverIntent2expRows();
                }