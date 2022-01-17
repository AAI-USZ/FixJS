function(data) {
	    if (data instanceof Array) {
		var i=0; var lim=data.length;
		while (i<lim) this.Import(data[i++]);
		return;}
	    else {
		var qid=data._id||data.oid||data.uuid;
		if (((debug)&&(this.traceimport))||(debug>1))
		    log("[%fs] Import to %s %o <== %o",
			fdjtET(),this.name,obj,data);
		if (this.storage) this.storage.Import(data);
		if (qid) {
		    var obj=(this.map[qid])||
			(this.map[qid]=this.cons(qid));
		    if (obj) obj.update(data);
		    else {
			obj=this.ref(qid);
			obj.init(data);}
		    return obj;}
		else return data;}}