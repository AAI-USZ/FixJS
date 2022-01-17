function export_extension_reload() {
  
  // don't reload if extension is not loaded  
  if ($('.ki_export').html() =='')
      return;

            $.post(export_extension_path + "processor.php", { axAction: "reload", axValue: filterUsers.join(":")+'|'+filterCustomers.join(":")+'|'+filterProjects.join(":")+'|'+filterActivities.join(":"),
                  id: 0, timeformat: $("#export_extension_timeformat").val(), dateformat: $("#export_extension_dateformat").val(), default_location: $("#export_extension_default_location").val(),
                  filter_cleared:$('#export_extension_tab_filter_cleared').attr('value'),
                  filter_refundable:$('#export_extension_tab_filter_refundable').attr('value'),
                  filter_type:$('#export_extension_tab_filter_type').attr('value'),
                first_day: new Date($('#pick_in').val()).getTime()/1000, last_day: new Date($('#pick_out').val()).getTime()/1000  },
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
            );
}