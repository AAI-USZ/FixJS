function(path, module_func, description){
        if(_.isFunction(module_func)){
          if(description === undefined){
            description = {};
          }
          var sandbox_path = path.split(".");
          var name = sandbox_path.pop();
          var parent = sandbox_path.join(".");
          description.name = name;
          description.path = path;
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