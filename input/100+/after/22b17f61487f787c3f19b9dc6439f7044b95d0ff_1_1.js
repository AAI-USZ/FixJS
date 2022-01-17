function cfEdit(){
	var rowid,idString="";
	$("#cf_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择要修改的物业费记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	$.ajax({
		type: 'POST',
		url: 'pre_check?action=edit&idStr='+idString,
		dataType: "json",
		success: function(data){
			if(data.result=='success'){
				openEditWindow('#cfEdit','selectCondoFee?action=edit&idStr='+idString);
			}
			else{
				alert("您选中的记录有已经缴纳物业费的记录，无法修改");
			}
		}
	});
}