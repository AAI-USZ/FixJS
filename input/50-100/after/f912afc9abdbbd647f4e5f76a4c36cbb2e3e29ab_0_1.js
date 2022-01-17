function() {
	if (!("sortable" in Sortable.sortables))
	{
		return;
	}
	
	Sortable.sortables.sortable.draggables.each(function(oDraggable){
		oDraggable.options.change = ChangeOrder;
		oDraggable.options.onEnd = UpdateOrder;
	});
}