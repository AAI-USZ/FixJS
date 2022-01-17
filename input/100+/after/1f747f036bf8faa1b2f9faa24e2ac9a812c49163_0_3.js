function(node, defaultBindingConfigurations) {

	_.extend(this, new Binding());

	if(null == node) throw 'unspecified node';

	if(!_.isObject(defaultBindingConfigurations)) throw 'invalid defaultBindingConfigurations';



	var _node = node;

	var _templateAttributes = [ ];

	var _template = _.template(_node.nodeValue, null, { interpolate: BindingHelpers.TEMPLATE_PATTERN });

	var _templateAttributes = { };

	

	(function() {

		var match;

		while(match = BindingHelpers.TEMPLATE_PATTERN.exec(node.nodeValue)) {

			var attributeName = match[1];

			_templateAttributes[attributeName] = defaultBindingConfigurations['@' + attributeName] || { };		

		}

	})();	



	this.read = function(model) { throw 'unsupported operation'; };



	this.write = function(model) {

		var templateValues = { };

		_.each(_templateAttributes, function(configuration, attributeName) {

			var attributeValue = model.get(attributeName);

			if(configuration.format)

				attributeValue = configuration.format(attributeValue, { direction: 'w', model: model, configuration: configuration });



			templateValues[attributeName] = attributeValue;

		});



		_node.nodeValue = _template(templateValues);

	};



	this.sources = function(e) { return false; };

}