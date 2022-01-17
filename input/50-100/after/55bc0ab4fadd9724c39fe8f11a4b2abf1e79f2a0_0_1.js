function(data) {
		show_notification_dialog(data.status, data.message);
		
		post_save_function();
		var test_case_id = $(":hidden[name='test_plan_case[test_case_id]']" ,$this).val();
		$("#testplan-tree li#exec_"+test_case_id+" a  ins").css({backgroundImage: "url("+EXEC_ICONS[execution_status]+")"});
	    }