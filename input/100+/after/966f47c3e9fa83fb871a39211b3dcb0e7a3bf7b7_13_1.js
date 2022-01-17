function ownerDelete(){
	
	var rowid,idString="";
	
	$("#owner_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	
	if(idString==""){
		alert("请选择删除的场地记录!");
		return;
	}
	
	idString=idString.substring(0,idString.length-1);
	
	if(!confirm("您将删除编号为："+idString+"的场地!"))return;
    	
	
	$.ajax({
		type: 'POST',
		url: 'deleteZone?idStr='+idString,
		dataType:"json",
		success: function(data){
			alert(data.msg);
			window.location.href="zone_list.jsp";
		}
	});
	
}