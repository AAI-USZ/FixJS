function(e){
					e.data.sky.clock = new Date(parseInt($('#'+id+'_year').val()), parseInt($('#'+id+'_month').val()-1), parseInt($('#'+id+'_day').val()), parseInt($('#'+id+'_hours').val()), parseInt($('#'+id+'_mins').val()), 0,0);
					e.data.sky.advanceTime(0,0);
				}