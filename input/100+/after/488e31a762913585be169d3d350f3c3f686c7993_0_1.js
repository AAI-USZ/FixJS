function(cb) {
		// Setup logger
		if (this._canlog) this.log=console.log;
		// Set the callback function, which is called after the resources are loaded.
		if (!this._cb) this._cb = cb;
		// Default stuff
		this.addImage("_dbf","akihabara/debugfont.png");
		if (this._splash.background) this.addImage("_splash",this._splash.background);
		gbox.addFont({id:"_dbf",image:"_dbf",firstletter:" ",tileh:5,tilew:4,tilerow:16,gapx:0,gapy:0});
		if (!gbox._splash.minimalTime)
			gbox._minimalexpired=2;
		this._waitforloaded();
	}