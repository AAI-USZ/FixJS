function cfInput(){
	var rowid,idString="";
	$("#cf_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择需要录入的物业费记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	$.ajax({
		type: 'POST',
		url: 'pre_check?action=record&idStr='+idString,
		dataType: "json",
		success: function(data){
			if(data.result=='success'){
				openEditWindow('#cfInput','selectCondoFee?action=record&idStr='+idString);
			}
			else{
				alert("您选中的物业费记录无法录入,可能有以下原因：\n(1)有记录尚未设置应收金额\n(2)有记录已经通过审核");
			}
		}
	});
}