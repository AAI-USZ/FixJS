function(params, callback)
	{
		$.post(this.mtt.mttUrl+'ToDoLists/setListSort', { list:params.list, sort:params.sort, projectId:params.project }, callback, 'json');
	}