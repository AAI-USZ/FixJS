function deleteProject(obj,objid){
	var id = parseInt(objid.attr("id").substr(3));
	if(!confirm("您将删除该项目以及关联楼宇、房产、业主、物业费信息,确定删除吗?"))return;
	$.ajax({
		type: "POST",
	    url: 'deleteProject?projectId='+id,
	    dataType: "json",
	    success : function(data){
		    obj.hide();
	    }
	});
}