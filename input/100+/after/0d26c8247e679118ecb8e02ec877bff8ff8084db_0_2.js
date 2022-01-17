function update_ref(data){
	    if (!(this._init)) return this.init(data);
	    var pool=this.pool; var map=pool.map;
	    for (var key in data) {
		if ((key==="pool")||(key=="init")) continue;
		var val=data[key], cur=this[key];
		if (val===cur) continue;
		else if (!(cur)) {
		    if (val instanceof Array) {
			var i=0, lim=val.length;
			while (i<lim) this.add(key,val[i++]);}
		    else this.add(key,val);}
		else if ((val instanceof Array)||
			 (cur instanceof Array)) {
		    var toadd=difference(val,cur);
		    var todrop=difference(cur,val);
		    var i=0; var lim=todrop.length;
		    while (i<lim) this.drop(key,todrop[i++]);
		    var i=0; var lim=toadd.length;
		    while (i<lim) this.add(key,toadd[i++]);}
		else {
		    this.drop(key,cur);
		    this.add(key,val);}}
	    return this;}