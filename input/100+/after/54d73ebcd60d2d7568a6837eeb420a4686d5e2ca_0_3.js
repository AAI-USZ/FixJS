function ($) {
	'use strict';

	function LoaderFactory(collection) {
		return function(path) { // = SubFolder/workDialog
		    var slices = path.split('/'),
		        name = slices[ slices.length - 1 ]; // = workDialog

		    if(collection[name]) {
		        return collection[name];
		    }

		    var 
    		    d = $.Deferred(),
                modulePath = App.Settings.modulesLocation + path + '/' + name + '.js',
		        moduleParams = App.Settings.modulesLocation + path + '/params.json';

            $.when($.getScript(modulePath), $.getJSON(moduleParams)).done(function(module, params){
                App.Modules.Get(name).init.apply(App.Modules.Get(name), [params[0]]);
                d.resolve();
            }).fail(function(){
                if(App.Settings.Debug.enabled) {
                    console.error('Error loading module ' + name);
                }
                d.reject();
            });
            return d.promise();
	    };
	};

	var
        appParts = ['Settings', 'EventManager', 'Ui', 'Inspector', 'Storage'],
        appIsBuilt = false,
        appPartsLocation = '/js/App/',

		/**
		 * Module Manager 
		 */
		ModuleManager = function() {
			var runningModules = [],
				factory = LoaderFactory(runningModules);
				
			return {
				Get: factory,

				Register: function(moduleName, obj)
				{
			        if(App.Settings.Debug.enabled) {
			            console.info('Registered module `' + moduleName + '`');
			        }
			        runningModules[moduleName] = obj;
				},

				RunningModules: function()
				{
				    return runningModules;
				},

				LoadModulesByScheme: function()
				{
			        var list = App.Settings.GetModulesScheme(),
			            loc = window.location.pathname;
			
			        for(var i = 0; i < list[loc].length; i++) {
			        	factory(list[loc][i]);
			        }
				}
			}
		},

        prepareApp = function(i) {
            $.getScript(appPartsLocation + appParts[i] + '.js')
            .done(function() {
                if(i < appParts.length - 1)
                    prepareApp(++i);
                else {
                    App.Modules.LoadModulesByScheme();
                    appIsBuilt = true;
                }
            })
            .fail(function() {
                console.warn('Error: ' + appPartsLocation + appParts[i] + '.js');
            });
        }

    ;return {
        Build: function(i) {
            if(appIsBuilt === false)
                prepareApp(i);
            else return false;
        },
        Modules: new ModuleManager()
    };
}