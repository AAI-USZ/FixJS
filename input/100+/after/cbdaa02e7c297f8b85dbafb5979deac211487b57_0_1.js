function(){
	// Load JSON data //
	console.log();
		$('#dataView').empty();
		$.ajax({
			url: 'data/data.json',
			type: 'GET',
			dataType: 'json',
			success: function(response){
				for (var i=0, j=response.workouts.length; i<j; i++){
					console.log(response.workouts[i]);
					var rw = response.workouts[i];
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ rw.training +'</h2>'+
							'<p>'+ rw.wname +'</p>'+
							'<p>'+ rw.favorite +'</p>'+
							'<p>'+ rw.howlong +'</p>'+
							'<p>'+ rw.timeofday +'</p>'+
							'<p>'+ rw.completiondate +'</p>'+
							'<p>'+ rw.comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				};
			},
			error: function(error){
				console.log(error);
			} 
		});
	}