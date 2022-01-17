function(response){
			console.log(response);
				for (var i=0, j=response.workouts.length; i<j; i++){
					var rw = response.workouts[i];
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ rw.workout +'</h2>'+
							'<p>'+ rw.training +'</p>'+
							'<p>'+ rw.wname +'</p>'+
							'<p>'+ rw.favorite +'</p>'+
							'<p>'+ rw.howlong +'</p>'+
							'<p>'+ rw.timeofday +'</p>'+
							'<p>'+ rw.completiondate +'</p>'+
							'<p>'+ rw.comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				};
			}