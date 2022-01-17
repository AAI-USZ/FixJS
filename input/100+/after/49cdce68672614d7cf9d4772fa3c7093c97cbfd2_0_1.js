function generateApp(config, node, appSchema, validate){
		// summary:
		//		generate the application
		//
		// config: Object
		//		app config
		// node: domNode
		//		domNode.
		if(!config.loaderConfig){
			config.loaderConfig = {};
		}
		if(!config.loaderConfig.paths){
			config.loaderConfig.paths = {};
		}
		if(!config.loaderConfig.paths["app"]){
			// Register application module path
			var path = window.location.pathname;
			if(path.charAt(path.length) != "/"){
				path = path.split("/");
				path.pop();
				path = path.join("/");
			}
			config.loaderConfig.paths["app"] = path;
		}
		require(config.loaderConfig);

		if(!config.modules){
			config.modules = [];
		}
		// add dojox/app lifecycle module by default
		config.modules.push("dojox/app/module/lifecycle");
		var modules = config.modules.concat(config.dependencies);

		if(config.template){
			var path = config.template;
			if(path.indexOf("./") == 0){
				path = "app/"+path;
			}
			modules.push("dojo/text!" + path);
		}

		require(modules, function(){
			var modules = [Application];
			for(var i = 0; i < config.modules.length; i++){
				modules.push(arguments[i]);
			}

			if(config.template){
				var ext = {
					templateString: arguments[arguments.length - 1]
				}
			}
			App = declare(modules, ext);

			ready(function(){
				var app = App(config, node || baseWindow.body());

				if(has("app-log-api")){
					app.log = function(){  
						// summary:
						//		If config is set to turn on app logging, then log msg to the console
						//
						// arguments: 
						//		the message to be logged, 
						//		all but the last argument will be treated as Strings and be concatenated together, 
						//      the last argument can be an object it will be added as an argument to the console.log 						
						var msg = "";
						try{
							for(var i = 0; i < arguments.length-1; i++){
								msg = msg + arguments[i];
							}
							console.log(msg,arguments[arguments.length-1]);
						}catch(e){}
					};
				}else{
					app.log = function(){}; // noop
				}

				app.setStatus(app.lifecycle.STARTING);
				// Create global namespace for application.
				// The global name is application id. For example: modelApp
				var globalAppName = app.id;
				if(window[globalAppName]){
					lang.mixin(app, window[globalAppName]);
				}
				window[globalAppName] = app;
				app.start();
			});
		});
	}