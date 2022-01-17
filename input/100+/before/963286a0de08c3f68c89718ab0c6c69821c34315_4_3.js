function xp_ext_reload() {
  
  // don't reload if extension is not loaded  
  if ($('.ki_export').html() =='')
      return;

            $.post(xp_ext_path + "processor.php", { axAction: "reload", axValue: filterUsr.join(":")+'|'+filterKnd.join(":")+'|'+filterPct.join(":")+'|'+filterEvt.join(":"),
                  id: 0, timeformat: $("#xp_ext_timeformat").val(), dateformat: $("#xp_ext_dateformat").val(), default_location: $("#xp_ext_default_location").val(),
                  filter_cleared:$('#xp_ext_tab_filter_cleared').attr('value'),
                  filter_refundable:$('#xp_ext_tab_filter_refundable').attr('value'),
                  filter_type:$('#xp_ext_tab_filter_type').attr('value'),
                first_day: new Date($('#pick_in').val()).getTime()/1000, last_day: new Date($('#pick_out').val()).getTime()/1000  },
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
            );
}