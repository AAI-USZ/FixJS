function(str)
{
	var x = [],
        i = 0,
        il = str.length;

    for(i; i < il; i++){
        if (str.charCodeAt(i))
		{
			x.push(str.charAt(i));
		}
    }

	return x.join('');
}