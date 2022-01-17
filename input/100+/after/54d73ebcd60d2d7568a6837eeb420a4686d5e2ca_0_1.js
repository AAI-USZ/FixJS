function(path) { // = SubFolder/workDialog
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
	    }