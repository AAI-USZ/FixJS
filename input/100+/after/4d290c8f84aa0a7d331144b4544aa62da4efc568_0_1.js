function (d, hours) {
        if(typeof hours == 'undefined')
		{
			hours = 0;
		}
		var MS_PER_MINUTE = 60000;
        var k = new Date(d - (60*hours) * MS_PER_MINUTE);

        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return k.getFullYear() + '-' 
		+ pad(k.getMonth() + 1) + '-' 
		+ pad(k.getDate()) + 'T' 
		+ pad(k.getHours()) + ':' 
		+ pad(k.getMinutes()) + ':' 
		+ pad(k.getSeconds()) + 'Z'
    }