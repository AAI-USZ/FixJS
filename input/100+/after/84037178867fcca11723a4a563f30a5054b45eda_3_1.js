function WorldChunk(name, x, y, debug){
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = CHUNK_SIZE;
		this.h = CHUNK_SIZE;
		this.left = x - this.w/2;
		this.top = y - this.h/2;
		this.right = this.left + this.w;
		this.bottom = this.top + this.h;
		this.debug = debug;
		if (debug){
		    console.log('%s: (%s,%s,%s,%s)', this.name, this.left, this.top, this.w, this.h);
		}
		this.init();
	}