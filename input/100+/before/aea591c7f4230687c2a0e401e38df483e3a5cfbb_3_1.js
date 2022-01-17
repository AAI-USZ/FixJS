function (Y, NAME) {
	'use strict';
	var CBX = 'contentBox';

	var TV = Y.Base.create(
		NAME,
		Y.Widget,
		[Y.FlyweightManager],
		{
			initializer: function (config) {
				this._loadConfig(config.tree);
			},
			renderUI: function () {
				this.get(CBX).setContent(this._getHTML());
			},
			CONTENT_TEMPLATE: '<ul></ul>'
			
		},
		{
			ATTRS: {
				defaultType: {
					value: 'TreeNode'
				}
				
			}
			
		}
	);
		
	Y.TreeView = TV;
	
}