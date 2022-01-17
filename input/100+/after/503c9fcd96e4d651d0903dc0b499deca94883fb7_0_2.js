function(xml){
			console.log(xml);
				$(xml).find('workouts').each(function(){
					var workout = $(this).find('workout').text();
					var training = $(this).find('training').text();
					var wname = $(this).find('wname').text();
					var favorite = $(this).find('favorite').text();
					var howlong = $(this).find('howlong').text();
					var timeofday = $(this).find('timeofday').text();
					var completiondate = $(this).find('completiondate').text();
					var comments = $(this).find('comments').text();
					$(''+
						'<div class="workoutData">'+
							'<h2>'+ workout +'</h2>'+
							'<p>'+ training +'</p>'+
							'<p>'+ wname +'</p>'+
							'<p>'+ favorite +'</p>'+
							'<p>'+ howlong +'</p>'+
							'<p>'+ timeofday +'</p>'+
							'<p>'+ completiondate +'</p>'+
							'<p>'+ comments +'</p>'+
						'</div>'
					).appendTo('#dataView');
				});
			}