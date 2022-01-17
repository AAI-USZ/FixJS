function() {
		id = $(this).parent().attr('id');
		if(typeof id === "undefined") return true;
		id = id.split('-');
		id = id[id.length-1]
		editItem(id);
		return false;
	}