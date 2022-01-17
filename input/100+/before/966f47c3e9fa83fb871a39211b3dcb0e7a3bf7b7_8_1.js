function deleteList(){
	var rowid,idString="";
	$("#cf_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择要删除的物业费记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	if(!confirm("您将删除编号为："+idString+"物业费记录"))return;
	$.ajax({
		type: 'POST',
		url: 'pre_check?action=deleteList&idStr='+idString,
		dataType: "json",
		success: function(data){
			if(data.result=='success'){
				$.ajax({
					type: 'POST',
					url: 'cf_delete?idStr='+idString,
					success: function(data){
						alert(data.msg);
						window.location.href='cf_list_by_item.jsp?cfiId='+getQueryString("cfiId");
					}
				});
			} else {
				alert("您选中的记录不能删除,可能有以下原因：\n(1)该记录已经录入实收金额\n(2)该记录已经通过审核");
				return;
			}
		}
	});
}