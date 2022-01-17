function ownerDelete(){
	var rowid,idString="";
	$("#owner_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择删除的业主记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	if(!confirm("您将删除编号为："+idString+"的业主"))return;
	$.ajax({
		type: 'POST',
		url: 'deleteOwner?idStr='+idString,
		success: function(data){
			alert("业主记录删除成功");
			window.location.href=window.location.href;
		}
	});
}