function() {
		//console.log($(this).parent().attr('id'));
		id = $(this).parent().attr('id');
		if(typeof id === "undefined") return true;
		console.log(id);
		id = getID(id);
		deleteItem(id);
	}