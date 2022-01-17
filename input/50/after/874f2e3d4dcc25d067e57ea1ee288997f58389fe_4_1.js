function openEditProject(obj){
	var id=parseInt(obj.attr("id").substr(3));
	var url = 'getProject?proId='+id;
	openEditWindow("#editPro",url);
}