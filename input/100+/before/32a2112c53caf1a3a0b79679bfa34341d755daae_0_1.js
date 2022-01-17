function()
		{
			if(!this.dependencies)
			{
				var deps = [];

				// TODO: this does not completely work -- if any calls to widget() are
				// nested within some condition then, depending on the condition, the
				// the widget() function may not get called nor, thus, intercepted. The
				// result is that embedded widgets may not be recognized as dependencies.
				// Might need to use regex to extract dependencies in templates.

				/*
				*	Dependencies from markup
				*	Run the compiled markup function and intercept the calls to
				*	widget(type).
				*/
				var compiledMarkup = this.getCompiledMarkup();
				if(compiledMarkup)
				{
					var markupFn = eval(compiledMarkup);
					var idIdx = 0;
					markupFn(
					{
						query: {},
						params: {},
						widget: function(type, params)
						{
							params = params || {};
							var isLazy = !!params._lazy;

							if(!isLazy)
							{
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
						},
						nextId: function()
						{
							return "id_"+(idIdx++);
						},
						i18n: function(key)
						{
							return "";
						}
					});
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