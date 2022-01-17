function smsInform(){
	var houseId = getQueryString("houseId");
	if(!confirm("你将发送物业费催缴短信给该业主"))return;
	$.ajax({
		type: 'POST',
		url: 'sms_inform?houseId='+houseId,
		dataType: "json",
		success: function(data){
			alert(data.content);
		}
	});
}