function efcDelete(efcId){
	$.ajax({
		type:'post',
		url:'efc_delete?efcId='+efcId,
		dataType:"json",
		success:function(data){
			alert(data.msg);
			$('#efcList').window('refresh');
		}
	});
}