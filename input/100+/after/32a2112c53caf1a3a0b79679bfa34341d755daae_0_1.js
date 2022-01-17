function()
		{
			if(!this.dependencies)
			{
				var deps = [];

				var compiledMarkup = this.getCompiledMarkup();
				if(compiledMarkup)
				{
					var re = /widget\s*\(\s*"([^"]*)"/g;
					var m;
					while(m = re.exec(compiledMarkup))
					{
						var type = m[1];
						var depWidget = require("./widget_manager").instance().getWidget(type);
						if(depWidget)
						{
							var nestedDeps = depWidget.getDependencies();
							for(var i=0; i<nestedDeps.length; i++)
							{
								deps.push(nestedDeps[i]);
							}
							deps.push(type);
						}
					}
				}

				var rawScript = this.getFileData("js");

				try
				{
					var rawScriptWrapperFn = eval(
						"(function(context){ with(context){ try{" +
						rawScript +
						"}catch(ex){}}})"
					);
					rawScriptWrapperFn({
						depend: function(type)
						{
							deps.push(type);
						}
					});
				}
				catch(ex)
				{
					log.error(ex);
				}

				// add dependents' dependencies
				var depDeps = [];
				for(var i=0; i<deps.length; i++)
				{
					var depWidget = require("./widget_manager").instance().getWidget(deps[i]);
					if(depWidget)
						depDeps = _.union(depDeps, depWidget.getDependencies());
				}

				this.dependencies = _.uniq(_.union(deps, depDeps));
			}
			return this.dependencies;
		}