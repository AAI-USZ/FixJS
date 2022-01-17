function typeFromJson(model, typeName, json) {
//			ExoWeb.trace.log("typeInit", "{1}   <.>", arguments);

		// get model type. it may have already been created for lazy loading
		var mtype = getType(model, typeName, json.baseType);

		// set the default type format
		if (json.format) {
			mtype.set_format(getFormat(mtype.get_jstype(), json.format));
		}

		if (mtype.get_originForNewProperties() === "client") {
			ExoWeb.trace.throwAndLog("typeInit", "type \"{0}\" has already been loaded", mtype._fullName);
		}

		// define properties
		for (var propName in json.properties) {
			var propJson = json.properties[propName];

			// Type
			var propType = propJson.type;
			if (propJson.type.endsWith("[]")) {
				propType = propType.toString().substring(0, propType.length - 2);
				propJson.isList = true;
			}
			propType = getJsType(model, propType);

			// Format
			var format = getFormat(propType, propJson.format);

			// Add the property
			var prop = mtype.addProperty({
				name: propName,
				type: propType,
				isList: propJson.isList,
				label: propJson.label,
				format: format,
				isStatic: propJson.isStatic,
				isPersisted: propJson.isPersisted !== false,
				index: propJson.index
			});

			// setup static properties for lazy loading
			if (propJson.isStatic && propJson.isList) {
				Property$_init.call(prop, null, ListLazyLoader.register(null, prop));
			}

			// process property specific rules, which have a specialized json syntax to improve readability and minimize type json size
			if (propJson.rules) {
				for (var rule in propJson.rules) {
					var options = propJson.rules[rule];
				
					// default the type to the rule name if not specified
					if (!options.type) {
						options.type = rule;

						// calculate the name of the rule if not specified in the json, assuming it will be unique
						if (!options.name) {
							options.name = mtype.get_fullName() + "." + prop.get_name() + "." + rule.substr(0, 1).toUpperCase() + rule.substr(1);
						}
					}

					// initialize the name of the rule if not specified in the json
					else if (!options.name) {
						options.name = rule;
					}

					options.property = prop;
					ruleFromJson(mtype, options);
				}
			}
		}

		// ensure all properties added from now on are considered client properties
		mtype.set_originForNewProperties("client");

		// define methods
		for (var methodName in json.methods) {
			var methodJson = json.methods[methodName];
			mtype.addMethod({ name: methodName, parameters: methodJson.parameters, isStatic: methodJson.isStatic });
		}

		// define condition types
		if (json.conditionTypes)
			conditionTypesFromJson(model, mtype, json.conditionTypes);

		// define rules 
		if (json.rules) {
			for (var i = 0; i < json.rules.length; ++i) {
				ruleFromJson(mtype, json.rules[i]);
			}
		}

		// store exports
		if (json.exports) {
			mtype.set_exports(json.exports);
		}
	}