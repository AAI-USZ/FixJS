function efi_delete(){
	var efiId = $('#efiId').val();
	if(!confirm("你将删除编号为:"+efiId+"的项目，及其关联的电费清单"))return;
	$.ajax({
		type: 'POST',
		url: 'ef_item_delete?efiId='+efiId,
		dataType: "json",
		success: function(data){
			alert("电费项目删除成功");
			window.parent.location.href='ef_item_list.jsp';
		}
	});
}