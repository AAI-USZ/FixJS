function (Y, NAME) {
	'use strict';

	// TODO add expanded attribute and rendering
	// TODO add method for locating children container
	var Lang = Y.Lang,
		FWM = Y.FlyweightManager;
	
	var FWN = Y.Base.create(
		NAME,
		Y.Base,
		[],
		{
			_node:null,
			_getHTML: function() {
				// assumes that if you asked for the HTML it is because you are rendering it
				this._node._rendered = true;
				var attrs = this.getAttrs(),
					s = '', 
					templ = this.get('template') || this.constructor.TEMPLATE || this.get('root').get('nodeTemplate');
				this.forEachChild( function (fwNode) {
					s += fwNode._getHTML();
				});
				attrs.children = s;
				attrs.cname_node = FWM.CNAME_NODE,
				attrs.cname_children = FWM.CNAME_CHILDREN;
				
				return Lang.sub(templ, attrs);
				
			},
			_slideTo: function (node) {
				this._node = node;
			},
			forEachChild: function(fn, scope) {
				var root = this.get('root'),
					children = this._node.children,
					child, ret;
				scope = scope || this;
				if (children && children.length) {
					Y.Array.each(children, function (node, index) {
						child = root._poolFetch(node);
						ret = fn.call(scope, child, index);
						root._poolReturn(child);
						return ret;
					});
				}
			},
			_getExpanded: function () {
				return this._node.expanded !== false;
			},
			_setExpanded: function (value) {
				this._node.expanded = value = !!value;
				if (!this._node._rendered) {
				}
				var n = Y.one('#' + this.get('id'));
				if (value) {
					n.removeClass(FWM.CNAME_COLLAPSED);
				} else {
					n.addClass(FWM.CNAME_COLLAPSED);
				}
			},
			toggle: function() {
				this.set('expanded', !this.get('expanded'));
			}
		},
		{
			ATTRS: {
				root: {
					readOnly: true
				},
				template: {
					validator: Lang.isString,
					getter: function () {
						return this._node.template;
					},
					setter: function (value) {
						this._node.template = value;
					}
				},
				label: {
					validator: Lang.isString,
					getter: function () {
						return this._node.label;
					},
					setter: function (value) {
						this._node.label = value;
					}
				},
				id: {
					validator: Lang.isString,
					getter: function () {
						var id = this._node.id;
						if (!id) {
							id = this._node.id = Y.guid()
						}
						return id;
					},
					setter: function (value) {
						if (this._node.id) {
							return Y.Attribute.INVALID_VALUE;
						} else {
							return this._node.id = value;
						}
					}
				},
				expanded: {
					getter: '_getExpanded',
					setter: '_setExpanded'
				}
			}
		}
	);
	Y.FlyweightNode = FWN;

}