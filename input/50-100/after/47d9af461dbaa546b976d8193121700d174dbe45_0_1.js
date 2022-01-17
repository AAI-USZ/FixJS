function() {
                    var d = new Date(this.x);
                    d = d.toUTCString().split(" ");
					
					var timezone = getTimeZone();
					timezone = -1 * timezone;
					if (timezone > 0)
						timezone = "+" + timezone;
						
                    d = d[4] + " " + d[5] + timezone;
                    return '<b>'+ this.series.name +'</b><br/><em>Time: </em>'+ d +'<br/><em>Usage: </em>'+ this.y + 'MB';
                }