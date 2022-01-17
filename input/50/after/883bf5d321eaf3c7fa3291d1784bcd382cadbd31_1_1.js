function loadRef(arg){
	    var obj=getRef(arg);
	    if (!(obj)) return undefined;
	    else if (obj._init) return obj;
	    else obj.load();}