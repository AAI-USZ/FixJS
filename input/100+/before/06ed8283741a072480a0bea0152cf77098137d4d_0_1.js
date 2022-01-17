function(){
        /*
        Calculates and draws the path for the active satellite.
        */
        
		// Make sure a satellite is selected
		if (selected_satellite){
			// This is needed so that PLib will calculate the orbit of the selected satellite, not the last one that was configured
			satInfo = PLib.QuickFind(selected_satellite);
			
			// Find the PLib sat object of the selected satellite
			selected_satellite_plib = null;
			for (plib_satellite_counter = 0; plib_satellite_counter < PLib.sat.length; plib_satellite_counter++){
				if(PLib.sat[plib_satellite_counter].name == selected_satellite){
					selected_satellite_plib = PLib.sat[plib_satellite_counter];
					break;
				}
			}
			
			// Calculate and display the path
			tb = PLib.daynum - 0.05 * (1 / selected_satellite_plib.meanmo);
			tf = PLib.daynum + 3 * (1 / selected_satellite_plib.meanmo);
			PLib.daynum = tb;
			tracker_canvas_context.beginPath();
			last_x_pos = null;
			first_x_pos = null;
			first_y_pos = null;
			first_loop = true;
			while (PLib.daynum < tf){
				// This works by running the simulation forwards to calculate the satellites position at various times
				PLib.Calc();
				
				PLib.daynum += 10 / (24 * 3600);
				
				pos_lat = PLib.sat_lat;
				pos_lon = PLib.sat_lon;
				pos_lon = 360 - PLib.isplong;
				if (pos_lon > 180){
					pos_lon = -PLib.isplong;
				}
				
				pos_x = Math.round((pos_lon + 180)/360 * tracker_canvas_width);
				pos_y = Math.round((180 - (pos_lat + 90))/180 * tracker_canvas_height);
				
				if (first_loop){
					tracker_canvas_context.moveTo(pos_x, pos_y);
					first_x_pos = pos_x;
					first_y_pos = pos_y;
					first_loop = false;
				} else {
					if (Math.abs(pos_x-last_x_pos)<=200){
						// Loop didn't have to jump to other side of map, so draw. 
						tracker_canvas_context.lineTo(pos_x, pos_y);
					}
					tracker_canvas_context.moveTo(pos_x, pos_y);
				}
				
				last_x_pos = pos_x;
			}
			tracker_canvas_context.lineWidth = 2;
			tracker_canvas_context.strokeStyle = "#"+configuration['path_color']['value'];
			tracker_canvas_context.stroke();
		}
    }