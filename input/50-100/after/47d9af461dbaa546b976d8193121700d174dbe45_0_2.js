function() {
					var timezone = getTimeZone();
					timezone = -1 * timezone;
					if (timezone > 0)
						timezone = "+" + timezone;
                    return '<b>'+ this.point.name +' GMT' + timezone +'</b>: '+ this.percentage.toFixed(2) +' %'+ ' ('+ this.point.y.toFixed(2) +' MB)';
                }