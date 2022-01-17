function userDelete(){
	var rowid,idString="";
	$("#user_list td input:checked").each(function(){
		rowid=$(this).parent().parent().parent().attr("id");
		rowid=rowid.substr(3);
		idString+=rowid+",";
	});
	if(idString==""){
		alert("请选择要删除的业主记录");
		return;
	}
	idString=idString.substring(0,idString.length-1);
	if(!confirm("您确定要删除该用户信息?"))return;
	$.ajax({
		type:"post",
		dataType:"json",
		url:"deleteUser?idStr="+idString,
		success: function(data){
			alert(data.msg);
			window.location.href = "user_list.jsp";
		}
	});
	jQuery.post('deleteUser?idStr='+idString);
}