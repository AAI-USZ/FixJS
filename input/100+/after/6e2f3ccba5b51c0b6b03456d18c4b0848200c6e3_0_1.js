function(/*String||Object||Function*/ plugin, /*Integer?*/ index){
			// summary:
			//		takes a plugin name as a string or a plugin instance and
			//		adds it to the toolbar and associates it with this editor
			//		instance. The resulting plugin is added to the Editor's
			//		plugins array. If index is passed, it's placed in the plugins
			//		array at that index. No big magic, but a nice helper for
			//		passing in plugin names via markup.
			// plugin:
			//		String, args object, plugin instance, or plugin constructor
			// args:
			//		This object will be passed to the plugin constructor
			// index:
			//		Used when creating an instance from
			//		something already in this.plugins. Ensures that the new
			//		instance is assigned to this.plugins at that index.
			var args=lang.isString(plugin)?{name:plugin}:lang.isFunction(plugin)?{ctor:plugin}:plugin;
			if(!args.setEditor){
				var o={"args":args,"plugin":null,"editor":this};
				if(args.name){
					// search registry for a plugin factory matching args.name, if it's not there then
					// fallback to 1.0 API:
					// ask all loaded plugin modules to fill in o.plugin if they can (ie, if they implement args.name)
					// remove fallback for 2.0.
					if(_Plugin.registry[args.name]){
						o.plugin = _Plugin.registry[args.name](args);
					}else{
						topic.publish(dijit._scopeName + ".Editor.getPlugin", o);	// publish
					}
				}
				if(!o.plugin){
					try{
						// TODO: remove lang.getObject() call in 2.0
						var pc = args.ctor || lang.getObject(args.name) || require(args.name);
						if(pc){
							o.plugin = new pc(args);
						}
					}catch(e){
						throw new Error(this.id + ": cannot find plugin [" + args.name + "]");
					}
				}
				if(!o.plugin){
					throw new Error(this.id + ": cannot find plugin [" + args.name + "]");
				}
				plugin=o.plugin;
			}
			if(arguments.length > 1){
				this._plugins[index] = plugin;
			}else{
				this._plugins.push(plugin);
			}
			plugin.setEditor(this);
			if(lang.isFunction(plugin.setToolbar)){
				plugin.setToolbar(this.toolbar);
			}
		}