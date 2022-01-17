function = function(e) {
					
						e.originalEvent.preventDefault();
					
						var rt = (new Date()).getTime() - p1_time;
						var x = e.originalEvent.touches[0].pageX;
						var y = e.originalEvent.touches[0].pageY;
						
						click_count = click_count + 1;
						
						console.log("click event "+x+" "+y+". click count "+click_count+". click num "+trial.click_num);
						
						//save location
						click_locations.push([x,y]);
						click_times.push(rt);
						
						//save response time
						if(click_count == trial.click_num)
						{
							var click_loc_data = {"click_locations": click_locations};
							var click_time_data = {"click_times": click_times};
							var img = {"img": trial.a_path };
							// save data
							block.data[block.trial_idx] = $.extend({}, img, click_loc_data, click_time_data, trial.data);
						
							plugin.trial($this, block, trial, part + 1);
						}
					}