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

		if(this.debug === true){
			var stats = this.stats = new Stats();
			stats.setMode(0); // 0: fps, 1: ms

			// Align top-right
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.right = '0px';
			stats.domElement.style.top = '0px';

			document.body.appendChild( stats.domElement );
		}

		if( this.init ){
			this.init();
		}
	}