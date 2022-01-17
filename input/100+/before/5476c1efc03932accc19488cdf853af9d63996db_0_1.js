function(canvasId, proto){
		this.mainHandle = null;
		this.broadPhase = proto.coltech || (new ro.coltech.BruteForce);

		this.entities = [];
		this.uniq = 0;
		this.isRunning = false;

		// very simple custom extend
		var p;
		for(p in proto){
			if( proto.hasOwnProperty( p ) ){
				this[p] = proto[p];
			}
		}

		this.scale = proto.scale || 1;
		this.screen = new ro.Screen( document.getElementById(canvasId), this.scale );

		this.input = new ro.Input();

		if( this.init ){
			this.init();
		}
	}