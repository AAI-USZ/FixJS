function ($) {
	'use strict';
	
	function LoaderFactory (collection) {
		return function(name) {
		    if(collection[name]) {
		        return collection[name];
		    }

		    var 
    		    d = $.Deferred(),
                modulePath = App.Settings.modulesLocation + name + '/' + name + '.js',
		        moduleParams = App.Settings.modulesLocation + name + '/params.json';
            $.when($.getScript(modulePath), $.getJSON(moduleParams))
            .done(function(dialog, params){
    	       App.Modules.Get(name).init.apply(App.Modules.Get(name), [params[0]]);
    	       d.resolve();
            })
            .fail(function(){
                if(App.Settings.Debug.enabled) {
                    console.warn('Error loading module ' + name);
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
		ModuleManager = function () {
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
		},
		
        prepareApp = function (i)
        {
            $.getScript(appPartsLocation + appParts[i] + '.js')
            .done(function () {
                if(i < appParts.length - 1)
                    prepareApp(++i);
                else {
                    App.Modules.LoadModulesByScheme();
                    appIsBuilt = true;
                }
            })
            .fail(function () {
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