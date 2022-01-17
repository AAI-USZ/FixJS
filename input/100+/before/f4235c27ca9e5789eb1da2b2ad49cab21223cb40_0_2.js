function(event)
	{
		var listParent=$(this).closest(".autoListItem[_index], .autoListSource[_index]",context)	;
		
		var element=$(this);
		var id=listParent.attr("_id");
		var index=listParent.attr("_index");
		if (typeof id == "undefined")
			id='';
		element.addClass("ui-state-highlight");
		
		
		//create the view to edit the clicked item
		var editView={};
		$.extend( editView, params.editView );
		if (! editView.params)
			editView.params={};
		editView.focus=$(element).autoFindKeys(meta);
		editView.params[index]=id;
		editView.x=event.clientX;
		editView.y=event.clientY;
		viewCreate(
			{
				creator: element
			},
			editView);
	}