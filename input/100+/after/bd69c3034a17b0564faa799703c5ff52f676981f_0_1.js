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
			
			if (entry) { // scalar is already known
				entry.value = scalar.value;
				d3.select('#scalar-' + entry.id + ' div.value')
					.text(scalar.value)
				
				if (scalar.value < entry.min) {
					entry.min = scalar.value;
					d3.select('#scalar-' + entry.id + ' span.minValue')
						.text(entry.min)
				}
				
				if (scalar.value > entry.max) {
					entry.max = scalar.value
					d3.select('#scalar-' + entry.id + ' span.maxValue')
						.text(entry.max)
				}
			}
			else { // scalar is NEW
				var entry = scalarData[scalar.name] = {
					value: scalar.value,
					min: scalar.value,
					max: scalar.value,
					id: scalarID++,
					highlighted: false
				};
				
				var tile = d3.select('#scalar').append('div')
					.attr('class', 'tile')
					.attr('id', 'scalar-' + entry.id)
				tile.append('div')
					.attr('class', 'name')
					.text(scalar.name);
				tile.append('div')
					.attr('class', 'value')
					.text(scalar.value);
				tile.append('hr');
				
				
				var min = tile.append('div')
					.attr('class', 'minMax')			
				min.append('span')
					.attr('class', 'label')
					.text('min');
				min.append('br');
				min.append('span')
					.attr('class', 'minValue')
					.text(entry.min);
				
				
				var max = tile.append('div')
					.attr('class', 'minMax')
				max.append('span')
					.attr('class', 'label')
					.text('max');
				max.append('br');
				max.append('span')
					.attr('class', 'maxValue')
					.text(entry.min);
					
				// make it clickable
				$('#scalar-' + entry.id).click(function() {
					entry.highlighted = !entry.highlighted;
					
					if (entry.highlighted) {
						d3.select('#scalar-' + entry.id)
							.attr('class', 'tile highlighted')
					}
					else {
						d3.select('#scalar-' + entry.id)
							.attr('class', 'tile')
					}
							
				})
			}
		}
	}