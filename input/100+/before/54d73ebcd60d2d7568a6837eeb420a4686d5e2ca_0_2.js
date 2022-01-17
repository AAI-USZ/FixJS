function () {
			var runningModules = [],
				factory = LoaderFactory(runningModules);
				
			return {
				Get: factory,
				Register: function (moduleName, obj)
				{
			        if(App.Settings.Debug.enabled)
			            console.info('Registered module `' + moduleName + '`');
			        runningModules[moduleName] = obj;
				},
				RinningModules: function() {
				    return runningModules;
				},
				LoadModulesByScheme: function ()
				{
			        var list = App.Settings.GetModulesScheme(),
			            loc = window.location.pathname;
			
			        for(var i = 0; i < list[loc].length; i++) {
			        	factory(list[loc][i]);
			        }
				}
			}
		}