function() {
				var colors = [ ];
				
				for (var j = 0; j < getNumberOfRuns(); j++) {
					if (runsBeingDisplayed[j].visible)
						colors.push(runsBeingDisplayed[j].color);
				}
				
				if (colors.length > 0) 
					contentDiv.setAttribute('class', 'hasruns');
				else
					contentDiv.setAttribute('class', 'hasnoruns');
				
				var options = {
					title : measurement.name,
					width : contentDiv.offsetWidth / 2.05,
					height : contentDiv.offsetHeight / 2.05,
					hAxis : { format : '####' },
					legend : {'position' : 'none' },
					colors : colors
				};
				
				chart.draw(view, options);
			}