function (declare, query, lang, win, on, domClass, domAttr, trans, nodeData, string, domGeom, domStyle){
	var collapseSelector = '[data-toggle=collapse]';
	var Collapse = declare([], {
		defaultOptions: {
			toggle: true
		},
		constructor: function(element, options) {
			this.options = lang.mixin(lang.clone(this.defaultOptions), (options || {}));
			this.domNode = element;
		    if(this.options.parent){
			    this.parent = query(this.options.parent);
		    }
		    this.options.toggle && this.toggle();
		},
		dimension: function(target) {
			return domClass.contains(this.element, 'width') ? 'width' : 'height';
		},
		show: function(target){
			var dimension, scroll, actives, hasData;
			
			if(this.transitioning){ return; }
			
			dimension = this.dimension();
			scroll = string.toCamel(['scroll', dimension].join('-'));
console.log(scroll);
			actives = this.parent && query('> .accordion-group > .in', this.parent);
			
			if(actives && actives.length){
				hasData = nodeData.get(actives[0], 'collapse');
				if(hasData && hasData.transitioning){ return; }
				actives.collapse('hide');
				hasData || nodeData.set(actives[0], 'collapse', null);
			}
			
			domStyle.set(this.domNode, dimension, 0);
//			this.transition('addClass', $.Event('show'), 'shown')	//FIX
			domStyle.set(this.domNode, dimension, this.domNode[scroll]);
		},
		hide: function(target) {
			console.log("hide");
		},
		reset: function(target) {
			console.log("reset");
		},
		transition: function(method, startEvent, completeEvent){
			console.log("transition");
		},
		toggle: function(target) {
			this[domClass.contains(this.element, 'in') ? 'hide' : 'show']();
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
	})
	return Collapse;
}