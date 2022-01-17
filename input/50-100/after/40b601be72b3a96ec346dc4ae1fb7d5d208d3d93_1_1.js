function highLightToday()
{
	var today = new Date();
	today.setUTCSeconds(0, 0);
	today.setUTCMinutes(0);
	today.setUTCHours(0);
	
	//var todayUtc = CCDateToday();
	
	var selectorString = '[dateTimestamp="'+today.getTime()+'"]';
	$(selectorString).addClass("cal_day_today");
}