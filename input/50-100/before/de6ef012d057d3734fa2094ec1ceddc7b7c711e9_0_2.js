function(base, obj)
{
	var newObj = {};
	for(var prop1 in base)
	{
		newObj[prop1] = base[prop1];
	}
	for(var prop2 in obj)
	{
		newObj[prop2] = obj[prop2];
	}
	return newObj;
}