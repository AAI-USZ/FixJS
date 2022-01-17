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
				
				var sessionDiv = d3.select('#scalar-session-' + sessionID);
				
				sessionDiv.select('#scalar-' + entry.id + ' div.value')
					.text(round(scalar.value, 2))
				
				if (scalar.value < entry.min) {
					entry.min = scalar.value;
					sessionDiv.select('#scalar-' + entry.id + ' span.minValue')
						.text(round(entry.min, 2))
				}
				
				if (scalar.value > entry.max) {
					entry.max = scalar.value
					sessionDiv.select('#scalar-' + entry.id + ' span.maxValue')
						.text(round(entry.max, 2))
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
				
				var tile = d3.select('#scalar-session-' + sessionID).append('div')
					.attr('class', 'tile')
					.attr('id', 'scalar-' + entry.id)
				tile.append('div')
					.attr('class', 'name')
					.text(scalar.name);
				tile.append('div')
					.attr('class', 'value')
					.text(round(scalar.value, 2));
				tile.append('hr');
				
				
				var min = tile.append('div')
					.attr('class', 'minMax')			
				min.append('span')
					.attr('class', 'label')
					.text('min');
				min.append('br');
				min.append('span')
					.attr('class', 'minValue')
					.text(round(entry.min, 2));
				
				
				var max = tile.append('div')
					.attr('class', 'minMax')
				max.append('span')
					.attr('class', 'label')
					.text('max');
				max.append('br');
				max.append('span')
					.attr('class', 'maxValue')
					.text(round(entry.min, 2));
					
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
		else if (data.type == 'data') {
			var pl = data.payload
			entry = timeSeriesData[pl.name];
			
			if (entry) // plot already exists
			{
				updatePlot(pl.name, pl.value, pl.reference);
			} else {
				entry = timeSeriesData[data.payload.name] = {
					data: [],
					id: plotID++,
					min: pl.value,
					max: pl.value
				}
				
				var div = d3.select('#data').append('div')
					.attr('id', 'plot-' + entry.id)
					.attr('class', 'plot');
				
				div.append('span')
					.attr('class', 'name')
					.text(pl.name);
				
				entry.svg = div.append('svg')
					.attr('width', 444)
					.attr('height', 148)
					
				updatePlot(pl.name, pl.value, pl.reference);
			}
		}
	}