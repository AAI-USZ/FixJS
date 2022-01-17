function(declare, registry, _WidgetBase, _TemplatedMixin, dom, on){

	//	summary:

	//		Widget is not very complicated, it's a shortcut for the most common

	//		Dijit creation modules, _WidgetBase, and _TemplatedMixin.

	//		Widget also mixes in some useful methods, like show and hide.

	//		

	return declare('dx-alias.Widget', [_WidgetBase, _TemplatedMixin], {

		templateString:'<div></div>', //to be overwritten



		show: function(){

			dom.show(this.domNode);

		},



		hide: function(){

			dom.hide(this.domNode);

		},



		connectEvents: function(){

			this._connections.forEach(function(handle){ handle.resume(); }, this);

		},



		disconnectEvents: function(){

			this._connections.forEach(function(handle){ handle.pause(); }, this);

		},



		getObject: function(obj){

			return typeof obj == 'string' ? registry.byId(obj) : obj;

		},



		on: function(obj, event, ctx, method){

			this._connections = this._connections || [];

			var h = on(obj, event, ctx, method);

			this._connections.push(h);

			return h;

		},



		// add sub() ?



		destroy: function(){

			this._connections.forEach(function(h){

				h.remove();

			})

			this.inherited(arguments);

		}



	});

}