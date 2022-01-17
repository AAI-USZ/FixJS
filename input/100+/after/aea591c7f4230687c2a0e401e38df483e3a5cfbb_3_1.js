function (Y, NAME) {
	'use strict';
	var CBX = 'contentBox',

		/**
		 * Creates a Treeview using the FlyweightManager extension to handle its nodes.
		 * It creates the tree based on an object passed as the `tree` attribute in the constructor.
		 * @example
		 *
	var tv = new Y.TreeView({tree: [
		{
			label:'label 0',
			children: [
				{
					label: 'label 0-0',
					children: [
						{label: 'label 0-0-0'},
						{label: 'label 0-0-1'}
					]
				},
				{label: 'label 0-1'}
			]
		},
		{label: 'label 1'}

	]});
	tv.render('#container');
		 * @class TreeView
		 * @constructor
		 * @param config {Object} Configuration attributes
		 */
		TV = Y.Base.create(
			NAME,
			Y.Widget,
			[Y.FlyweightManager],
			{
				/**
				 * Widget lifecycle method
				 * @method initializer
				 * @param config {object} configuration object of which 
				 * `tree` contains the tree configuration.
				 */
				initializer: function (config) {
					this._loadConfig(config.tree);
					this.after('click', this._afterClick);
				},
				
				renderUI: function () {
					this.get(CBX).setContent(this._getHTML());
				},
				_afterClick: function (ev) {
					var node = this._poolFetchFromEvent(ev);
					if (node) {
						node.fire('click');
					}
					this._poolReturn(node);
				},
				CONTENT_TEMPLATE: '<ul></ul>'

			},
			{
				ATTRS: {
					/**
					 * Override for the `defaultType` value of FlyweightManger
					 * so it creates TreeNode instances instead of the default.
					 * @attribute defaultType
					 * @type String
					 * @default 'TreeNode'
					 */
					defaultType: {
						value: 'TreeNode'
					}

				}

			}
		);
		
	Y.TreeView = TV;
	
}