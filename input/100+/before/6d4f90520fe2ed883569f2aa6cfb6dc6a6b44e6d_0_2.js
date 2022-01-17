function saveCustomView(view)
{
	var savedViews=Ext.getCmp('saved_views');
	if( savedViews.getRootNode().childNodes[1].findChild('text',view.getStateId()) )
	{
		savedViews.getRootNode().childNodes[1].replaceChild({
			text:view.getStateId(), 
			viewstate: view.getState(),
			leaf: true 
		},savedViews.getRootNode().childNodes[1].findChild('text',view.getStateId()));
	}
	else
	{
		savedViews.getRootNode().childNodes[1].appendChild({
			text:view.getStateId(), 
			viewstate: view.getState(),
			leaf:true 
		});
	}
}