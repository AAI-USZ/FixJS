function(module_name, module_func, description){
        if(_.isFunction(module_func)){
          if(description === undefined){
            description = {};
          }
          var sandbox_path = module_name.split(".");
          description.name = sandbox_path.pop();
          description.path = module_name;
          description.require = description.require || [];
          if(parent){
            description.require.push(parent);
          }
          if(0 <= _.indexOf(reserved_names, description.name)){
            try {
              console.error("invalid module name: '" + description.name + "'. Don't use names: ", reserved_names.join(", "));
            }
            catch(e) {
              alert("invalid module name: '" + description.name + "'. Don't use names: ", reserved_names.join(", "));
            }
            return;
          }
         
          sandbox.bind(helpers.module_ready_event_name(sandbox_path.join(".")), function(){
            var sandbox = core;
            _.each(sandbox_path, function(name){
              sandbox = sandbox.node.children[name].sandbox;
            });
            sandbox.module(module_func, description);
          });
        }
      }