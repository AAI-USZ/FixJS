function(_, $) {



if(!$) throw 'Backbone.Fusion requires jQuery';

if(!_) throw 'Backbone.Fusion requires underscore.js';



var __module__ = (__module__ = typeof exports !== 'undefined' && exports !== null ? exports : window)

	&& (__module__ = __module__.Backbone || (function() { throw 'Backbone.Fusion requires Backbone.js'; })())

	&& (__module__ = __module__.Fusion = { });



function kvp(k, v) {

	var p = { };

	p[k] = v;

	return p;

}	



var

	ArrayCheckboxInputBinding,

	Binder,

	Binding,

	BindingHelpers,

	BooleanCheckboxInputBinding,

	ElementBinding,

	Formats,

	FormattedElementBinding,

	TemplateBinding,

	TextInputBinding

;	



__module__.Formats = Formats = {

	'integer': function(value, context) {

		if(null === value || !/^-?[0-9]+$/.test(value = value.toString())) return NaN;

		return parseInt(value, 10);

	},

	'float': function(value, context) {

		if(null === value || !/^-?([0-9,]+(\.[0-9,]*)?)|(\.[0-9,]+)$/.test(value = value.toString())) return NaN;

		return parseFloat(value.replace(',', ''));

	},

	'money': function(value, context) {

		if('r' == context.direction) {

			if(null === value || !/^-?\$?([0-9,]+(\.[0-9]{0,2})?)|(\.[0-9]{1,2})$/.test(value = value.toString())) return NaN;

			return parseFloat(value.replace(/[^0-9.-]+/g, ''));

		} else {

			return null === value

				? ''

				: (value < 0 ? '-' : '') + '$' + value.toString();

		}

	},

	'negative-integer': function(value, context) {

		value = Formats['integer'](value, context);

		return value < 0 ? value : NaN;

	},

	'non-negative-integer': function(value, context) {

		value = Formats['integer'](value, context);

		return value >= 0 ? value : NaN;

	},

	'non-positive-integer': function(value, context) {

		value = Formats['integer'](value, context);

		return value <= 0 ? value : NaN;

	},

	'positive-integer': function(value, context) {

		value = Formats['integer'](value, context);

		return value > 0 ? value : NaN;

	},

	'text': function(value) {

		return (value || '').toString();

	}

};



__module__.Binding = Binding = function() {

	this.read = function(model) { throw 'not implemented'; };

	this.write = function(model) { throw 'not implemented'; };

	this.sources = function(e) { throw 'not implemented'; };

};



__module__.ElementBinding = ElementBinding = function(element, configuration) {

	_.extend(this, new Binding());



	if(!_.isElement(element)) throw 'invalid element';

	if(null == configuration) throw 'null configuration';



	this._getElement = function() { return element; };

	this._getConfiguration = function() { return configuration; }



	this.sources = function(e) {

		if(null == e) throw 'null event';

		return this._getElement() === e.target && _.contains(this._getConfiguration().events, e.type);

	};

};



__module__.FormattedElementBinding = FormattedElementBinding = function(element, configuration) {

	_.extend(this, new ElementBinding(element, configuration));



	this._formatValue = function(value, model, direction) {

		if(!this._getConfiguration().format) return value;



		return this._getConfiguration().format(value, {

			binding: this,

			configuration: this._getConfiguration(),

			direction: direction,

			model: model,

		});

	};



	this._readRawValue = function() { throw 'not implemented'; };



	this.read = function(model) {

		var value = this._readRawValue();

		value = this._formatValue(value, model, 'r');

		return kvp(this._getConfiguration().attribute, value);

	};



	this._writeRawValue = function(value) { throw 'not implemented'; };



	this.write = function(model) {

		var value = model.get(this._getConfiguration().attribute);

		value = this._formatValue(value, model, 'w');

		this._writeRawValue(value);

	};

};



__module__.TextInputBinding = TextInputBinding = function(element, configuration) {

	_.extend(this, new FormattedElementBinding(element, configuration));



	var _element = element;



	this._readRawValue = function() { return this._getElement().value; };

	this._writeRawValue = function(value) { this._getElement().value = value; };

};



__module__.BooleanCheckboxInputBinding = BooleanCheckboxInputBinding = function(element, configuration) {

	_.extend(this, new ElementBinding(element, configuration));

	

	this.read = function(model) {

		return kvp(this._getConfiguration().attribute, this._getElement().checked);

	};



	this.write = function(model) {

		var value = model.get(this._getConfiguration().attribute);

		// TODO: should this throw on non-boolean value?

		this._getElement().checked = !!value;

	};

};



__module__.ArrayCheckboxInputBinding = ArrayCheckboxInputBinding = function(element, configuration) {

	_.extend(this, new ElementBinding(element, configuration));



	var _element = element;

	var _configuration = configuration;



	this.read = function(model) {

		var modelValue = model.get(_configuration.attribute);

		return _element.checked

			? kvp(_configuration.attribute, _.union(modelValue, [ _element.value ]))

			: kvp(_configuration.attribute, _.without(modelValue, _element.value));	

	};



	this.write = function(model) {

		_element.checked = _.contains(model.get(_configuration.attribute), _element.value);

	};

};



__module__.TemplateBinding = TemplateBinding = function(node, defaultBindingConfigurations) {

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

};



__module__.BindingHelpers = BindingHelpers = (function() {

	var BINDING_ATTRIBUTE = 'data-binding';

	var BINDING_DEFAULTS_ATTRIBUTE = 'data-binding-defaults';



	var binders = [

		{

			bind: function(element, configuration) { return new TextInputBinding(element, configuration); },

			binds: function(element) {

				return 'input' === element.tagName.toLowerCase()

					&& _.contains([ 'hidden', 'text', 'search', 'url', 'telephone', 'email', 'password', 'range', 'color' ], element.getAttribute('type'));

			}

		}, {	

			bind: function(element, configuration) { return new TextInputBinding(element, configuration); },

			binds: function(element) {

				return 'textarea' === element.tagName.toLowerCase();

			}

		}, {

			bind: function(element, configuration) { return new BooleanCheckboxInputBinding(element, configuration); },

			binds: function(element) {

				return 'input' === element.tagName.toLowerCase() && 'checkbox' === element.getAttribute('type')

					&& !element.hasAttribute('value');

			}

		}, {

			bind: function(element, configuration) { return new ArrayCheckboxInputBinding(element, configuration); },

			binds: function(element) {

				return 'input' === element.tagName.toLowerCase() && 'checkbox' === element.getAttribute('type')

					&& element.hasAttribute('value');

			}

		}	

	];



	var getDeclaredDefaultBindingConfigurations = function(element) {

		if(!element.hasAttribute(BINDING_DEFAULTS_ATTRIBUTE))

			return null;



		var declaredString = element.getAttribute(BINDING_DEFAULTS_ATTRIBUTE);

		var declared  = (function() {

			try { return eval('({' + declaredString + '})'); }

			catch (ex) { throw 'error evaluating ' + BINDING_DEFAULTS_ATTRIBUTE + ' "' + declaredString + '"'; }

		})();	



		_.each(declared, function(d) {

			// TODO: should this have its own implementation?

			processElementBindingConfiguration(d);

		});



		return declared;

	}



	var getEffectiveDefaultBindingConfigurations = function(inherited, declared) {

		if(!declared) return inherited;



		var effective = { }; 

		// Second level copy of inherited to effective

		_.each(inherited, function(inheritedDefaults, inheritedName) {

			effective[inheritedName] = _.clone(inheritedDefaults);

		});



		// Second level copy of declared over effective

		_.each(declared, function(declaredDefaults, declaredName) {

			var effectiveDefaults = effective[declaredName] || (effective[declaredName] = { });

			_.extend(effectiveDefaults, declaredDefaults);

		});

		return effective;

	};



	var getDefaultBindingConfigurations = function(element, inherited) {

		// TODO: global defaults ala { events: ['keyup'], '@attname':{ format: 'money' } }

		// TODO: operators, e.g. { $reset: true } -> clear defaults, { '@attname': { $reset: true } }

		if(!_.isElement(element)) throw 'invalid element';	

		if(!_.isObject(inherited)) throw 'invalid inherited';



		var declared = getDeclaredDefaultBindingConfigurations(element);



		if(!declared)

			return inherited;



		return getEffectiveDefaultBindingConfigurations(inherited, declared);

	};



	var getDeclaredElementBindingConfiguration = function(element) {

		if(!element.hasAttribute(BINDING_ATTRIBUTE))

			return null;



		var declaredString = element.getAttribute(BINDING_ATTRIBUTE);

		if(!!~(declaredString.indexOf(':'))) {

			try { return eval('({' + declaredString + '})'); }

			catch (ex) { throw 'error evaluating ' + BINDING_ATTRIBUTE + ' "' + declaredString + '"'; }

		} else {

			return { attribute: declaredString };

		}

	}



	var processElementBindingConfiguration = function(configuration) {

		if(configuration.format) {

			if(_.isString(configuration.format)) {

				var namedFormat = Formats[configuration.format];

				if(!_.isFunction(namedFormat))

					throw 'invalid named format "' + configuration.format + '"';

				configuration.format = namedFormat;	

			}

			if(!_.isFunction(configuration.format))

				throw 'invalid format';

		}



		configuration.events || (configuration.events = ['change']);

	};



	var getElementBindingConfiguration = function(element, defaults) {

		if(!_.isElement(element)) throw 'invalid element';

		

		var declaredConfiguration = getDeclaredElementBindingConfiguration(element);



		if(!declaredConfiguration)

			return null;



		var attributeName = declaredConfiguration.attribute;

		var attributeDefaults = defaults['@' + attributeName];



		var configuration = _.defaults(_.clone(declaredConfiguration), attributeDefaults);



		processElementBindingConfiguration(configuration);



		return configuration;

	};



	var isTemplatedNode = function(node) {

		return null != node.nodeValue && !!node.nodeValue.match(BindingHelpers.TEMPLATE_PATTERN);

	};

	

	return {



		TEMPLATE_PATTERN: /{{([a-zA-Z_$][a-zA-Z_$0-9]*)}}/g,



		DOM_EVENTS: [

			'change', 'focus', 'focusin', 'focusout', 'hover', 'keydown', 'keypress', 'keyup',

			'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup',

			'resize', 'scroll', 'select', 'submit', 'toggle'

		],



		CreateBindingsForElement: function(element, inheritedDefaultBindingConfigurations) {

			if(!_.isElement(element)) throw 'invalid element';



			var defaultBindingConfigurations = getDefaultBindingConfigurations(element, inheritedDefaultBindingConfigurations || { });



			var bindingConfiguration = getElementBindingConfiguration(element, defaultBindingConfigurations);

			if(bindingConfiguration) {

				var selectedBinder = _.find(binders, function(binder) { return binder.binds(element); });

				if(selectedBinder)

					return [ selectedBinder.bind(element, bindingConfiguration) ];

			}



			var bindings = [ ];



			_.each(element.attributes, function(attributeNode) {

				if(isTemplatedNode(attributeNode))

					bindings.push(new TemplateBinding(attributeNode, defaultBindingConfigurations));

			});



			_.each(element.childNodes, function(childNode) {

				switch(childNode.nodeType) {

					case Node.ELEMENT_NODE:

						_.chain(BindingHelpers.CreateBindingsForElement(childNode, defaultBindingConfigurations))

							.each(function(childBinding) { bindings.push(childBinding); });

						break;

					case Node.TEXT_NODE:

						if(isTemplatedNode(childNode))

							bindings.push(new TemplateBinding(childNode, defaultBindingConfigurations));

						break;

				}

			});



			return bindings;

		}

	};

})();



__module__.Binder = Binder = function() {

	var _bindings = [ ];

	var _model = null;

	var _element = null;

	var _sourceBinding = null;

	var _bound = false;



	function _onDomEvent(e) {

		if(null != _sourceBinding) throw 'concurrent events?';



		// Find the binding claiming responsibility for the event

		_sourceBinding = _.find(_bindings, function(binding) { return binding.sources(e); });



		// If no binding claimed the event, then do nothing

		if(null == _sourceBinding)

			return;



		_model.set(_sourceBinding.read(_model));	



		_sourceBinding = null;

	};



	function _onModelChange(e) {

		_.each(_bindings, function(binding) {

			if(_sourceBinding !== binding) {

				binding.write(_model);

			}

		});

	};



	this.bind = function bind(model, element) {

		if(!(null != model)) throw 'model must be specified';

		if(!_.isElement(element)) throw 'invalid element';

		if(_bound) throw 'Binder has already been bound';



		_bound = true;

		_model = model;

		_element = element;

		_bindings = BindingHelpers.CreateBindingsForElement(_element);



		_model.on('change', _onModelChange, this);

		$(_element).on(BindingHelpers.DOM_EVENTS.join(' '), _onDomEvent);



		_.each(_bindings, function(binding) {

			binding.write(_model);

		});

	};



	this.unbind = function unbind() {

		_model.off('change', _onModelChange, this);

		$(_element).off(BindingHelpers.DOM_EVENTS.join(' '), _onDomEvent);



		_bindings = [ ];

		_element = null;

		_model = null;

	};

};



}