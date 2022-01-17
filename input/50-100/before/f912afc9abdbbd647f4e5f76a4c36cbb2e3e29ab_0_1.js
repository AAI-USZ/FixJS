function(oDraggable){
		oDraggable.options.change = ChangeOrder;
		oDraggable.options.onEnd = UpdateOrder;
	}