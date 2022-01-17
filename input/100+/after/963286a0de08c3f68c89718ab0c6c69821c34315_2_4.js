function expense_extension_reload() {
            $.post(expense_extension_path + "processor.php", { axAction: "reload_exp", axValue: filterUsers.join(":")+'|'+filterCustomers.join(":")+'|'+filterProjects.join(":"), id: 0,
                first_day: new Date($('#pick_in').val()).getTime()/1000, last_day: new Date($('#pick_out').val()).getTime()/1000 },
                function(data) { 
                    $("#expenses").html(data);
                
                    // set expenses table width
                    ($("#expenses").innerHeight()-$("#expenses table").outerHeight() > 0 ) ? scr=0 : scr=scroller_width; // width of exp table depending on scrollbar or not
                    $("#expenses table").css("width",expenses_width-scr);
                    // stretch refundable column in faked expenses table head
                    $("#expenses_head > table > tbody > tr > td.refundable").css("width", $("div#expenses > div > table > tbody > tr > td.refundable").width());
                    // stretch customer column in faked expenses table head
                    $("#expenses_head > table > tbody > tr > td.customer").css("width", $("div#expenses > div > table > tbody > tr > td.customer").width());
                    // stretch project column in faked expenses table head
                    $("#expenses_head > table > tbody > tr > td.project").css("width", $("div#expenses > div > table > tbody > tr > td.project").width());
                    expense_extension_applyHoverIntent();
                }
            );
}