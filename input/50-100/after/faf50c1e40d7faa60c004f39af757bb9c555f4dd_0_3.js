function adjustmentMonth(){
	var prev_month = month-1;
	var next_month = month+1;
	if(prev_month < 1){
		prev_month = 12;
	}
	if(next_month > 12){
		next_month = 1;
	}
	j(".e2m_calender .month .prevmonth").html("<a href=\"\">&lt;&lt;" + prev_month + "月</a>");
	j(".e2m_calender .month .currentmonth").html(month + "月");
	j(".e2m_calender .month .nextmonth").html("<a href=\"\">" + next_month + "月&gt;&gt;</a>");
	j(".e2m_calender .cal_year").html("<p class=\"cal_year\">"+year+"年</p>");
}