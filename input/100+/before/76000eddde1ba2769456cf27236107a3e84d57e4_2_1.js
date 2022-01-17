function(options){
	//Allow resource loading through villo.load. Set forceReload to true to call the init.
	if (villo.isLoaded === true) {			
		if(options.forceReload && options.forceReload === true){
			//Allow function to continue.
		}else{
			//Load resources
			villo.resource(options);
			//Stop it.
			return true;
		}
	}
	
	
	
	//
	// Villo Initialization:
	//
	
	villo.apiKey = options.api || "";
	
	//Passed App Information
	villo.app.type = options.type || "";
	villo.app.title = options.title || "";
	villo.app.id = options.id || "";
	villo.app.version = options.version || "";
	villo.app.developer = options.developer || "";
	
	//Load up the settings (includes sync + cloud).
	if (villo.store.get("VilloSettingsProp")) {
		villo.settings.load({
			callback: villo.doNothing
		});
	}
	
	//Have to do it this way because false is to turn it off:
	if("analytics" in options && options.analytics === false){
		villo.analytics.disable();
	}else{
		villo.analytics.enable();
	}
	
	//Optional: Turn on logging.
	if(options.verbose){
		villo.verbose = options.verbose;
	}
	
	//Check login status.
	if (villo.store.get("token.user") && villo.store.get("token.token")) {
		villo.user.strapLogin({username: villo.store.get("token.user"), token: villo.store.get("token.token")});
		//User Logged In
		villo.sync();
	} else {
		//User not Logged In
	}
	
	var include = [];
	if (options.include && (typeof(options.include === "object")) && options.include.length > 0) {
		for (var x in options.include) {
			if (options.include.hasOwnProperty(x)) {
				include.push(options.include[x]);
			}
		}
	}
	if (options.extensions && (typeof(options.extensions === "object")) && options.extensions.length > 0) {
		for (var y in options.extensions) {
			if (options.extensions.hasOwnProperty(y)) {
				include.push(options.extensions[y]);
			}
		}
	}
	if(include.length > 0){
		$LAB.script(include).wait(function(){
			villo.doPushLoad(options);
		});
	} else {
		villo.doPushLoad(options);
	}
}