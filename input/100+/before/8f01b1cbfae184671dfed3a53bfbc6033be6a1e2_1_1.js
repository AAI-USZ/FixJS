function (props) {
		var valueField = props.valueField || 'id';
		var displayField = props.displayField || 'name';
		var objectTypeFilter = props.objectTypeFilter || 'all';
		var placeholder = props.placeholder;
		var noTargetHighlight = !!props.noTargetHighlight;

		var template;
		var resourceItem;
		var resourceValue;
		var targetObject;
		var targetAttribute;
		var lastAttributeValue;

		var element = $('<input id="aloha-attribute-field-' + props.name + '">');
		if (props.cls) {
			element.addClass(props.cls);
		}
		if (props.width) {
			element.width(props.width);
		}

		Component.define(props.name, Component, {
			scope: props.scope,
			init: function () {
				this._super();
				this.element = $('<span>');
				var that = this;
				PubSub.sub('aloha.ui.container.activated', function (message) {
					var container = message.data;
					if (container.visible &&
					    container === that._container &&
						(!Aloha.activeEditable ||
						 Aloha.activeEditable === container.editable)) {
						element.appendTo(that.element);
					}
				});
			}
		});

		element.autocomplete({
			'html': true,
			'appendTo': Context.selector(),
			'source': function( req, res ) {
				RepositoryManager.query({
					queryString: req.term,
					objectTypeFilter: objectTypeFilter
				}, function( data ) {
					res($.map(data.items, function(item) {
						return {
							label: parse(template, item),
							value: item.name,
							obj: item
						};
					}));
				});
			},
			"select": onSelect
		});

		element
			.bind("focus", onFocus)
			.bind("blur", onBlur)
			.bind("keyup", onKeyup);

		setPlaceholder();

		function onSelect (event, ui) {
			if (ui.item) {
				setItem(ui.item.obj);
			}
			finishEditing();
		}

		function onBlur () {
			finishEditing();
		}

		function onFocus (event, ui) {
			if ( ! $(event.target).is(':visible') ) {
				// The check for visible fixes the bug that the background
				// color of the target element is not restored.
				// Rationale: it's possible for the input to receive the focus event,
				// for example if it was triggered programatically, even if
				// it isn't visible. Problem is, if it's not visible, then
				// it will not really get focused and consequently, there
				// will be no blur event either. However, we must be able to
				// assume that the blur event will be fired so that we can
				// clean up the background color.
				return;
			}
			changeTargetBackground();

			// Remove placeholder
			if (getValue() === placeholder) {
				setValue('');
			}
		}

		function onKeyup () {
			// If this attribute field currently refers to a repository
			// item, and the user edits the contents of the input field,
			// this attribute field seizes to refer to the repository item.
			if (resourceItem && resourceValue !== getValue()) {
				resourceItem = null;
				resourceValue = null;
			}

			// This handles attribute updates for non-repository, literal urls typed into the input field.
			// Input values that refer to a repository item are handled via setItem().
			if ( ! resourceItem ) {
				setAttribute(targetAttribute, getValue());
			}
		}

		function finishEditing () {
			restoreTargetBackground();

			if ( ! targetObject || lastAttributeValue === $(targetObject).attr(targetAttribute)) {
				return;
			}

			// when no resource item was selected, remove any marking of the target object
			if ( ! resourceItem ) {
				RepositoryManager.markObject( targetObject );
			}

			if (getValue() === '') {
				setPlaceholder();
			}
		}

		function changeTargetBackground () {
			if (noTargetHighlight) {
				return;
			}
			// set background color to give visual feedback which link is modified
			var	target = $(targetObject);
			if (target && target.context && target.context.style &&
				target.context.style['background-color']) {
				target.attr('data-original-background-color',
							target.context.style['background-color']);
			}
			target.css('background-color', '#80B5F2');
		}

		function restoreTargetBackground () {
			if (noTargetHighlight) {
				return;
			}
			var target = $(targetObject);
			// Remove the highlighting and restore original color if was set before
			var color = target.attr('data-original-background-color');
			if (color) {
				target.css('background-color', color);
			} else {
				target.css('background-color', '');
			}
			target.removeAttr('data-original-background-color');
		}

		function parse (template, item) {
			return template.replace( /\{([^}]+)\}/g, function(_, name) {
				return name in item ? item[ name ] : "";
			});
		}

		function setPlaceholder () {
			if (null == placeholder) {
				return;
			}
			element.css('color', '#AAA');
			element.val(placeholder);
		}

		function setTemplate (tmpl){
			template = tmpl;
		}

		/**
		 * When at least on objectType is set the value in the Attribute field does a query to all registered repositories.
		 * @param {Array} objectTypeFilter The array of objectTypeFilter to be searched for.
		 * @void
		 */
		function setObjectTypeFilter (objTypeFilter) {
			objectTypeFilter = objTypeFilter;
		}

		/**
		 * Adding a listener to the field
		 * @param {String} eventname The name of the event. Ex. 'keyup'
		 * @param {function} handler The function that should be called when the event happens.
		 */
		function addListener (eventName, handler) {
			element.bind(eventName, $.proxy(handler, attrField));
		}

		function getValue () {
			return element.val();
		}

		function setValue (value) {
			element.val(value);
			element.css('color', 'black');
		}

		function setItem (item) {
			resourceItem = item;

			if (item) {
				// TODO split display field by '.' and get corresponding attribute, because it could be a properties attribute.
				var v = item[displayField];
				// set the value into the field
				setValue(v);
				// store the value to be the "reference" value for the currently selected resource item
				resourceValue = v;
				setAttribute(targetAttribute, item[valueField]);
				RepositoryManager.markObject(targetObject, item);
			} else {
				resourceValue = null;
			}
		}

		function getItem () {
			return resourceItem;
		}

		/**
		 * Sets an attribute optionally based on a regex on reference
		 * @param {String} attr The Attribute name which should be set. Ex. "lang"
		 * @param {String} value The value to set. Ex. "de-AT"
		 * @param {String} regex The regex when the attribute should be set. The regex is applied to the value of refernece.
		 * @param {String} reference The value for the regex.
		 */
		function setAttribute (attr, value, regex, reference) {
			if (targetObject) {
				// check if a reference value is submitted to check against with a regex
				var setAttr = true;
				if (typeof reference != 'undefined') {
					var regxp = new RegExp(regex);
					if ( ! reference.match(regxp) ) {
						setAttr = false;
					}
				}

				// if no regex was successful or no reference value
				// was submitted remove the attribute
				if ( setAttr ) {
					$(targetObject).attr(attr, value);
				} else {
					$(targetObject).removeAttr(attr);
				}
			}
		}

		/**
		 * Sets the target Object of which the Attribute should be modified
		 * @param {jQuery} obj the target object
		 * @param {String} attr Attribute to be modified ex. "href" of a link
		 * @void
		 */
		function setTargetObject (obj, attr) {
			targetObject = obj;
			targetAttribute = attr;

			setItem(null);
			
			if (obj && attr) {
				lastAttributeValue = $(obj).attr(attr);
				setValue($(targetObject).attr(targetAttribute));
			} else {
				setValue('');
				return;
			}

			// check whether a repository item is linked to the object
			RepositoryManager.getObject( obj, function ( items ) {
				if (items && items.length > 0) {
					setItem(items[0]);
				}
			} );
		}

		function getTargetObject () {
			return targetObject;
		}

		function focus () {
			element.focus();
		}

		function show () {
			element.show();
		}

		function hide () {
			element.hide();
		}

		function getInputId (){
			return element.attr("id");
		}

		function hasInputElem () {
			return true;
		}

		function getInputElem () {
			return element[0];
		}

		var attrField = {
			getInputElem: getInputElem,
			hasInputElem: hasInputElem,
			getInputId: getInputId,
			hide: hide,
			show: show,
			focus: focus,
			getTargetObject: getTargetObject,
			setTargetObject: setTargetObject,
			setAttribute: setAttribute,
			getItem: getItem,
			setItem: setItem,
			setValue: setValue,
			getValue: getValue,
			addListener: addListener,
			setObjectTypeFilter: setObjectTypeFilter,
			setTemplate: setTemplate,
			setPlaceholder: setPlaceholder
		}
		return attrField;
	}
