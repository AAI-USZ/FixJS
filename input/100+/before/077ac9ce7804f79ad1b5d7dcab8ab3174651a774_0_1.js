function(){
		//console.log();
		$.ajax({
			url: 'ProcessRecords.php',
			type: 'GET',
			data: 'id='+$(this).parent().parent().children('td:first-child').text()+'&data='+$(this).val()+'&field='+$(this).parent().index()+'&table='+$('.tabs .active').parent().index(),
			success: function(result){
				console.log(result);
			}
		});
		$(this).parent().html($(this).val());
	}