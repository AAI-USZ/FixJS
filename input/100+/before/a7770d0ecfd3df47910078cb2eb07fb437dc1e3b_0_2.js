function(template, data) {
	var control = this;
	var name = control._cssClassFromControlName();
	var extract = function(value) {
		return $.isFunction(value) ? value() : value;
	};
	var instructions = {
		"class": function(value) {
			return name + "-" + value;
		},
		"data": function(key) {
			return Echo.Utils.getNestedValue(data, key, "");
		},
		"label": function(key) {
			return control.labels.get(key, "");
		},
		"self": function(key) {
			var value = Echo.Utils.getNestedValue(control, key, function() {
				var _value = Echo.Utils.getNestedValue(control.data, key,
					function() { return control.config.get(key, ""); });
				return extract(_value);
			});
			return extract(value);
		}
	};
	var processor = function(match, key, value) {
		return instructions[key] ? instructions[key](value) : match;
	};
	return template.replace(Echo.Vars.regexps.templateSubstitution, processor);
}