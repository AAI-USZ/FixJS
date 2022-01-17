function cfAudit(){
	var rowid,idString="";
	$("#cf_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择要审核的物业费记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	$.ajax({
		type: 'POST',
		url: 'pre_check?action=audit&idStr='+idString,
		dataType: "json",
		success: function(data){
			if(data.result=='success'){
				openEditWindow('#cfAudit','selectCondoFee?action=audit&idStr='+idString);
			}
			else{
				alert("您选中的记录有无法审核,可能有以下原因：\n(1)该记录已经通过审核(2)该记录尚未录入实收金额");
			}
		}
	});
}