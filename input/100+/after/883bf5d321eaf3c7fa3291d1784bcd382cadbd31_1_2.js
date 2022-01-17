function init_ref(data){
	    // If it's already been initialized, we're updating
	    if (this._init) return this.update(data);
	    // This is called initialize a reference the first time we
	    //  get data for it
	    var pool=this.pool; var map=pool.map;
	    if ((this._init)&&(this._init>init_start)) {
		// Inits have already been run in this session, so we just
		//  update
		this.update_ref(data);
		return;}
	    this._init=fdjtTime();
	    if (((debug)&&(pool.traceref))||(debug>1))
		log("Initial reference to %o <== %o @%d",
		    this,data,this._init);
	    for (var key in data) {
		// We assume that data doesn't inherit anything,
		//  so we don't need a 'hasOwnProperty' check
		if ((key==='qid')||(key==='pool')) {}
		else if ((key==='_id')||(key==='oid')||(key==='oid')) {
		    var value=data[key];
		    if (!(map[value])) map[value]=this;
		    else if (map[value]!==this)
			warn("identifier conflict %o=%o for %o and %o",
			     key,value,map[value],this);
		    else {}}
		else if (key[0]==='_') {}
		else {
		    // We use the .add method to get any side effects
		    var value=data[key]; var qid;
		    if (value instanceof Array) {
			var i=0; var len=value.length;
			while (i<len) {
			    var v=value[i++]; /* back to here */
			    if ((!(v))&&(v!==false)&&(v!==0)) {}
			    else if (qid=((v._qid)||(v._id))) {
				var pool=getPool(qid);
				if (pool) this.add(key,pool.Import(v));
				else this.add(key,v);}
			    else this.add(key,v);}}
		    else if (qid=((value._qid)||(value._id))) {
			var pool=getPool(qid);
			if (pool) this.add(key,pool.Import(value));
			else this.add(key,v);}
		    else this.add(key,value);}}
	    // Now we run the init procedures for the pool
	    var inits=pool.inits;
	    if (inits) {
		if (((debug)&&(pool.traceinit))||(debug>2))
		    log("Running pool inits for %o: %o",this,inits);
		var i=0; var lim=inits.length;
		while (i<lim) inits[i++](this);}
	    // We now run local delayed inits
	    var inits=this._inits; delete this._inits;
	    if (inits) {
		if (((debug)&&(pool.traceinit))||(debug>2))
		    log("Running delayed inits for %o: %o",this,inits);
		delete this._inits;
		var i=0; var lim=inits.length;
		while (i<lim) inits[i++](this);}
	    return this;}