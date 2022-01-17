function(Core, settings,  modules) {
	//lets setup the global context 
	var globalContext = new Core.Context(); // create the global context object
	globalContext.getSettings().load(settings); // add settings to the global object
	
	//load all the modules
	var moduleLoader = new Core.Loader(globalContext);
	moduleLoader.load(modules); // initialize the apploader and pass the global object

	//activate the global context once everything is setup
	globalContext.activate();
	
	
}