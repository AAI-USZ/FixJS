function(text){
			console.log(text);
				var lines = text.split("\n");
				console.log(lines);
				for (var lineNum = 0; lineNum < lines.length; lineNum++) {
					var row = lines[lineNum];
					var columns = row.split(",");
					console.log(columns);
					$(''+
							'<div class="workoutData">'+
								'<h2>'+ columns[0] +'</h2>'+
								'<p>'+ columns[1] +'</p>'+
								'<p>'+ columns[2] +'</p>'+
								'<p>'+ columns[3] +'</p>'+
								'<p>'+ columns[4] +'</p>'+
								'<p>'+ columns[5] +'</p>'+
								'<p>'+ columns[6] +'</p>'+
								'<p>'+ columns[7] +'</p>'+
							'</div>'
						).appendTo('#dataView');
				}
			}