function(){
	$.ajax({
		type: 'POST',
		dataType: "json",
		async: true,
		url: '/senddata',
		data: {directcmd:$("#directcmd_value").val()},
		success: function(stuff){
			console.log(stuff);
		}
	});
}