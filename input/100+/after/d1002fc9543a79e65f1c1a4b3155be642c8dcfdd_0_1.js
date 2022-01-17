function setDirectionsText(response)
	{
		// Text for Routing here.
		var distance = 0;
		var l = 0;
		thisStep = 0;
		totalsteps = 0;
		allsteps = new Array();
		for (var leg in response.routes[0].legs)
		{
			l++;
			var s = 0;
			for(var x in response.routes[0].legs[leg].steps)
			{
				s++;
				var thisstep = x;
				thisstep++;
				var stepmiles = response.routes[0].legs[leg].steps[x].distance.value /1609.334;
				stepmiles = Math.round(stepmiles*100)/100;
				distance = distance + response.routes[0].legs[leg].steps[x].distance.value;
				allsteps[totalsteps] = new Object();
				allsteps[totalsteps].text = (totalsteps+1)+'. '+response.routes[0].legs[leg].steps[x].instructions+' (Go '+stepmiles+' miles)';
				allsteps[totalsteps].latlng = response.routes[0].legs[leg].steps[x].start_location;
				allsteps[totalsteps].latlngEnd = response.routes[0].legs[leg].steps[x].end_location;
				allsteps[totalsteps].path = response.routes[0].legs[leg].steps[x].path;
				totalsteps++;
			}
		}
		var miles = distance / 1609.344;
		miles = Math.round(miles*100)/100;
		$('#myTextDiv').html('<b>Total Distance: '+miles+' miles.</b>');
		if($('#directions').hasClass('alert-error'))
		{
			$('#directions').removeClass('alert-error');
			$('#directions').addClass('alert-info');
		}
		$('#directions-text').html('<b>Total Distance: '+miles+' miles</b><br>Click above to step through directions.');
		if($(window).width() < 769)
		{
			$('#show-directions').text('Show Directions');
			$('#show-directions').removeClass('hide');
			$('#alert-directions').addClass('hide');
			$('#btn-dir').addClass('hide');
		}
		else
		{
			$('#show-directions').text('Hide Directions');
			$('#show-directions').removeClass('hide');
			$('#alert-directions').removeClass('hide');
			$('#btn-dir').removeClass('hide');
		}
	}