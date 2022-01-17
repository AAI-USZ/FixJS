function(d,v){
						v -= 1;
						d.setMonth(v);
						while (d.getMonth() != v)
							d.setDate(d.getDate()-1);
						return d;
					}