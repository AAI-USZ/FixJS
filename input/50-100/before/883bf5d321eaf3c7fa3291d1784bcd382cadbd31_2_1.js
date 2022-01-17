function clearLocal(){
	    if (window.localStorage) {
		var storage=window.localStorage;
		var i=0; var lim=storage.length;
		var keys=[];
		while (i<lim) keys.push(storage.key(i++));
		i=0; while (i<lim) storage.removeItem(keys[i++]);}}