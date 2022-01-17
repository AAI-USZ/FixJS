function highLightToday()
{
	var today = new Date();
	today.setSeconds(0, 0);
	today.setMinutes(0);
	today.setHours(0);
	var selectorString = '[dateTimestamp="'+today.getTime()+'"]';
	$(selectorString).addClass("cal_day_today");
}