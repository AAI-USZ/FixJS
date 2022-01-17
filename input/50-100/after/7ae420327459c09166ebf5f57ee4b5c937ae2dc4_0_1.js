function(){

	$("#getJSON").on("click", function(){

		$("#dataHolder").empty();
		$.ajax({
			url: 		"data/data.json",
			type:		"GET",
			dataType:	"json",
			success:	function(response){
				console.log(response);
			}
			
		});
});
}