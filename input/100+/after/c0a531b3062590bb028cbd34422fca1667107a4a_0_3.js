function (declare, query, lang, win, on, domClass, domAttr, trans, nodeData, string, domGeom, domStyle){
	var collapseSelector = '[data-toggle=collapse]';
	var Collapse = declare([], {
		defaultOptions: {
			toggle: true
		},
		constructor: function(element, options) {
			this.options = lang.mixin(lang.clone(this.defaultOptions), (options || {}));
			this.domNode = element;
            if (this.options.parent) {
                this.parent = query(this.options.parent);
            }
            this.options.toggle && this.toggle();
		},
		dimension: function() {
			return domClass.contains(this.domNode, 'width') ? 'width' : 'height';
		},
		show: function(){
			var dimension, scroll, actives, hasData;

			if(this.transitioning){ return; }

			dimension = this.dimension();
			scroll = string.toCamel(['scroll', dimension].join('-'));
			actives = this.parent && query('> .accordion-group > .in', this.parent);

			if(actives && actives.length){
				hasData = nodeData.get(actives[0], 'collapse');
				if(hasData && hasData.transitioning){ return; }
				actives.collapse('hide');
				hasData || nodeData.set(actives[0], 'collapse', null);
			}

			domStyle.set(this.domNode, dimension, 0);
			this.transition('add', 'show', 'shown');
			domStyle.set(this.domNode, dimension, this.domNode[scroll]);
		},
		hide: function() {
            if (this.transitioning) { return; }
            var dimension = this.dimension();
            this.reset(domStyle.get(this.domNode, dimension));
            this.transition('remove', 'hide', 'hidden');
            domStyle.set(this.domNode, dimension, 0);
        },
		reset: function(size) {
            var dimension = this.dimension();
            domClass.remove(this.domNode, 'collapse');
            domStyle.set(this.domNode, dimension, (size || 'auto'));
            this.domNode.offsetWidth;
            domClass[(size !== null ? 'add' : 'remove')](this.domNode, 'collapse');
            return this;
        },
		transition: function(method, startEvent, completeEvent){
            var _this = this,
                _complete = function () {
                    if (startEvent == 'show') { _this.reset(); }
                    _this.transitioning = 0;
                    on.emit(_this.domNode, completeEvent, {bubbles: false, cancelable: false});
                };

            on.emit(this.domNode, startEvent, {bubbles: false, cancelable: false});

            this.transitioning = 1;

            domClass[method](this.domNode, 'in');

            trans && domClass.contains(this.domNode, 'collapse') ?
                on.once(_this.domNode, trans.end, _complete) : _complete();
        },
		toggle: function () {
			this[domClass.contains(this.domNode, 'in') ? 'hide' : 'show']();
		}
	});
	lang.extend(query.NodeList, {
		collapse: function(option) {
			var options = (lang.isObject(option)) ? option : {};
			return this.forEach(function(node) {
				var data = nodeData.get(node, 'collapse');
				if(!data){
					nodeData.set(node, 'collapse', (data = new Collapse(node, options)))
				}
				if (lang.isString(option)) {
					data[option].call(data);
				}
			});
		}
	});

	on(win.body(), on.selector(collapseSelector, 'click'), function(e){
		var node = query(e.target)[0];
		var href, target = domAttr.get(node, 'data-target')
			|| e.preventDefault()
			|| (href = domAttr.get(node, 'href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
		nodeData.load(target);
		var option = nodeData.get(target, 'collapse') ? 'toggle' : nodeData.get(target);
		query(target).collapse(option);
	});
	return Collapse;
}