function loadRef(arg){
	    var obj=getRef(arg);
	    if (obj) return obj.load();
	    else return undefined;}