function addDuration() { 
	// validate  
	var begindate = new Date($("#new_event_start_year").val()); 
	var enddate = new Date($("#new_event_end_year").val()); 
	bandCalculator.begin 		=  begindate.getTime();
	bandCalculator.end 			=  enddate.getTime();
	bandCalculator.name 		= $("#new_event_title").val();
	bandCalculator.chart 		= $('.timeline').attr('data-id');
	bandCalculator.description 	= $('#event_description').val();

	if (!(/\S/.test(bandCalculator.name))) { // no title has been given
	    bandCalculator.name='click to give me a name';
	}
	
	if (bandCalculator.end < bandCalculator.begin) { 
		bandCalculator.end = bandCalculator.begin; 
	} 

	//Put the exitsing events into an ordered array
	bandCalculator.search_events = events['events']; 
	bandCalculator.search_events.sort(function(a, b){
		var first = a.classname.split("_");
		var second = b.classname.split("_");
 		return first[1]-second[1]; 
	});

	bandCalculator.saveBand = function(answer_array) { 
		bandCalculator.saved = false; 
		$.each(answer_array, function(index, value) {
			console.log("name:" + bandCalculator.name);
			last_index = answer_array.length - 1; 
			if (value == 'sucess') {  
				console.log('adding to sucessful band'); 
				submit_event_to_server(bandCalculator.name, bandCalculator.description, bandCalculator.begin, bandCalculator.end, index, bandCalculator.chart);
				bandCalculator.saved = true;
				return false; 
			} 
			if (!bandCalculator.saved && index == last_index) { 
				console.log('making a new band'); 
				submit_event_to_server(bandCalculator.name, bandCalculator.description, bandCalculator.begin, bandCalculator.end, index+1, bandCalculator.chart);
				bandCalculator.saved = true;				
			}	 
		});
	}

	//this is the first event
	if (bandCalculator.search_events.length == 0) { 
		band_answer= 1; 
		submit_event_to_server(bandCalculator.name, bandCalculator.description, bandCalculator.begin, bandCalculator.end, band_answer, bandCalculator.chart);
	}

	else  {
		answer_array = [];

		$.each(bandCalculator.search_events, function(index, value) { // calculate which band is free
			//search for dates that start in the same period as ours

			console.log("-------");
			var test_start_year = parseInt(value.start.getFullYear());
			console.log("test_start_year "+test_start_year);
			var test_end_year = parseInt(value.end.getFullYear());
			console.log("test_end_year "+test_end_year);
			var start_year = parseInt($("#new_event_start_year").val());
			console.log("start_year "+start_year); 
			var end_year = parseInt($("#new_event_end_year").val()); 
			console.log("end_year "+end_year); 
		

			var band_test = value.classname.split("_");
			band_test = parseInt(band_test[1]);

			last_index = bandCalculator.search_events.length - 1; 
			
			console.log("band_val" + band_test);
			
			if (test_start_year >= start_year && test_start_year <= end_year) { 	
				console.log('start infringement found');
				answer_array[band_test] = "fail"; 
			}

			//is there a date that ends in the same period as ours? 
			else if (test_end_year >= start_year && test_end_year <= end_year) { 
				console.log('end infringement found');
				answer_array[band_test] = "fail"
			}

			//is there a date that ends in the same period as ours? 
			else if (test_start_year <= start_year && test_end_year >= end_year) { 
				console.log('total infringement found');
				answer_array[band_test] = "fail"
			}			

			else {
				console.log('no infringement found '); 
				if(answer_array[band_test] != 'fail' ) { 
					answer_array[band_test] = "sucess";
				} 
			}

			//trigger band saving once we've looped through everything 
			if (index == last_index) {
				bandCalculator.saveBand(answer_array); 
			}							
		});
	}	
}