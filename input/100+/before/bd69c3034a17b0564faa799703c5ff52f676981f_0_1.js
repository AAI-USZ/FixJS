function(msg) {	
		var data = JSON.parse(msg.data);
		
		if (data.type === 'log') {
			addLog(data.payload);
			d3.select('#lineCounter')
				.text(logData.length);
		}
		else if (data.type === 'scalar') {
			var scalar = data.payload;
			var entry = scalarData[scalar.name];
			
			if (entry) {
				entry.value = scalar.value;
				
				if (scalar.value > entry.max)
					entry.max = scalar.value;
				if (scalar.value < entry.min)
					entry.min = scalar.value;
			}
			else {
				scalarData[scalar.name] = {
					value: scalar.value,
					min: scalar.value,
					max: scalar.value
				};
			}
			
			updateScalar();
		}

		
		// else if(data.type === 'data') {
		// 	dataArray = dataArray.concat(data.payload);
		// 	if (dataArray.length > 100) {
		// 		dataArray.splice(0, dataArray.length - 100);
		// 	}
		// 	update();			
		// }
	}