function( instances, options ) {
			this.length = 0;
			this._namespace = ".list" + (++id);
			this._init = 1;
			this.bind('change',Can.proxy(this._changes,this));
			this.push.apply(this, Can.makeArray(instances || []));
			Can.extend(this, options);
			//if(this.comparator){
			//	this.sort()
			//}
			delete this._init;
		}