function listLocal(){
	    var keys=[];
	    if (window.localStorage) {
		var storage=window.localStorage;
		var i=0; var lim=storage.length;
		while (i<lim) keys.push(storage.key(i++));}
	    return keys;}