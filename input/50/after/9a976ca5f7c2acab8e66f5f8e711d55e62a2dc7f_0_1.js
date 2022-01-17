function(data) {
			if(data.Stations[0] != undefined)
				thatmivb.options.station = thatmivb
					.capitalizeWords(data.Stations[0].name);
		}