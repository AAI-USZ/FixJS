function(){

		$("#dataHolder").empty();
		$.ajax({
			url: 		"xhr/data.json",
			type:		"GET",
			dataType:	"json",
			success:	function(response){
			}
			
		});
}