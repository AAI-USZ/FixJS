function smsInform(){
	var houseId = getQueryString("houseId");
	$.ajax({
		type: 'POST',
		url: 'sms_inform?houseId='+houseId,
		success: function(data){
			if(data.result=='success'){
				
			}
			else{
				
			}
		}
	});
}