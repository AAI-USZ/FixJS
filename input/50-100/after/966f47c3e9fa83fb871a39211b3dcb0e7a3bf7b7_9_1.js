function ef_delete(){
	var idStr = getSelectedIds();
	if(!confirm("您将删除编号为："+idStr+"电费记录"))return;
	$.ajax({
		type: 'POST',
		url: 'ef_delete?idStr='+idStr,
		dataType:"json",
		success: function(data){
			alert(data.msg);
			window.location.href='ef_list_by_item.jsp?efiId='+getQueryString("efiId");
		}
	});
}