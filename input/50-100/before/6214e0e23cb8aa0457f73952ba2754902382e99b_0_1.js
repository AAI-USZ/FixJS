function()
{
	new Ext.Viewport({
		layout: 'border',
		items: [ {
			region: 'center',
			xtype: 'AceEditor',
			unstyled: true,
			theme: 'twilight',
			fontSize: '13px',
			contentEl: 'pre_1',
			parser: 'liquid'
		} ]
	});
}