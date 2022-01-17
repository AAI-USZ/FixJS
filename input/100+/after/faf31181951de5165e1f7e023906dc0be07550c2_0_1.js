function isStale(target)
{
	var xmlHttpObject = new XMLHttpRequest();

	if(target == null || target == '')
	{
		xmlHttpObject.open('get', questionStatusUrl + '?action=isStale', false);
	}
	else
	{
		xmlHttpObject.open('get', questionStatusUrl + '?action=isStale&quest=' + target, false);
	}
	xmlHttpObject.send(null);
	
	if(xmlHttpObject.responseText == 'true')
	{
		return true;
	}
	else
	{
		return false;
	}
}