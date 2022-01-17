function(dialog, params){
    	       App.Modules.Get(name).init.apply(App.Modules.Get(name), [params[0]]);
    	       d.resolve();
            }