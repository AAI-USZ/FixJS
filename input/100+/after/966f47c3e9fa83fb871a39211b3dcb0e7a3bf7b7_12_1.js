function ownerDelete(){
	
	var rowid,idString="";
	
	$("#owner_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	
	if(idString==""){
		alert("请选择删除的消控历史记录!");
		return;
	}
	
	idString=idString.substring(0,idString.length-1);
	
	if(!confirm("您将删除编号为："+idString+"的历史记录!"))return;
    
	$.ajax({
		type: 'POST',
		url: 'deleteFireInfoBak?idStr='+idString,
		dataType:"json",
		success: function(data){
			alert(data.msg);
			window.location.href="fireInfoHistory_list.jsp";
		}
	});
	
}