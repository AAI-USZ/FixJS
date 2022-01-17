function openEditProject(obj){
	var id=parseInt(obj.attr("id").substr(3));
	var url = 'getProject?projectId='+id;
	openEditWindow("#editPro",url);
}