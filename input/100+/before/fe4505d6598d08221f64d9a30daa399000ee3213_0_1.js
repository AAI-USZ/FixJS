function(e) {
		var val = $(this).val();
		
		//if empty, show all reports
		if(!val) {
			$("#report_list > .report_list").show();
			$("#report_list h2.title").removeClass('collapsed').addClass('expanded');
			$("#report_list h2.no_title").removeClass('expanded').addClass('collapsed');
			$("#report_list .report").show().removeClass('selected');
		
			refresh_report_list();
		
			return;
		}
		
		var re = new RegExp(val, "i");
		
		//get matching reports
		var matching = $.grep(reports,function(el) {
			return re.test(el.name);
		});
		
		//hide all reports
		$("#report_list > .report_list").hide();
		$("#report_list .report").hide().removeClass('selected');
		$("#report_list h2").removeClass('expanded').addClass('collapsed');
		
		//loop through all matches
		for(var i in matching) {
			//if a directory matches, show it and all the child reports
			if(!matching[i].report) {
				showReportList($('#report_'+matching[i].id));
			}
			//if a single report matches, show it and highlight it
			else {
				$('#report_'+matching[i].id).parent().addClass('selected').show().parents('.report_list').last().show();
				$('#report_'+matching[i].id).parents('.report_list').prev('h2').addClass('expanded').removeClass('collapsed');
			}
		}
		
		//make sure we aren't scrolled above the report list
		if($(window).scrollTop() < ($('#report_list').offset().top - 50)) {
			$(window).scrollTop($('#report_list').offset().top - 50);
		}
		
		refresh_report_list();
	}