function (factory) {
					var component = defer();

					if (!spec.id) spec.id = name;

					factory(component.resolver, spec, pluginApi);

					return processComponent(component, spec, name);
				}