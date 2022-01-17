function getTimeZone()
{
	var timezone = new Date().getTimezoneOffset();
	timezone = (-1) * timezone;
	timezone = Math.floor(timezone / 60);
	
	return timezone;
}