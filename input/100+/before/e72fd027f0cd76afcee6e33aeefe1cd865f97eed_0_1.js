function(propertyName) {

				var contextProperty = context[propertyName];

				if (contextProperty instanceof Function) {

					fluidContext[propertyName] = createFluentWrapperFunction(propertyName, contextProperty);

				}

			}