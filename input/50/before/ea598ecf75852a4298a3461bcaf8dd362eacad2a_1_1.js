function(params, callback)
	{
		$.post(this.mtt.mttUrl+'ToDoLists/setListSort', { list:params.list, sort:params.sort }, callback, 'json');
	}