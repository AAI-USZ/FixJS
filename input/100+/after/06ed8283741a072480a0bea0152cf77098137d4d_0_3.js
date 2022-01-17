function(curr_satellite_info, curr_satellite_name){
        /*
        Plots a marker on the canvas for the specified satellite.
        
        @param curr_satellite_info: PLib satellite info object.
        @param curr_satellite_name: Name of the current satellite.
        */
		
        // Determine color
        if (curr_satellite_name==selected_satellite){
            tracker_canvas_context.fillStyle = '#'+configuration['satellite_selected_color']['value'];
        } else {
            tracker_canvas_context.fillStyle = '#'+configuration['satellite_color']['value'];
        }
        
        // Calculate the pixel location of the satellite
        curr_satellite_lon = curr_satellite_info.longitude;
        curr_satellite_lat = curr_satellite_info.latitude;
        x_pos = Math.round((curr_satellite_lon+180)/360*tracker_canvas_width);
        y_pos = Math.round((180-(curr_satellite_lat+90))/180*tracker_canvas_height);
        
        // Add the indicator to tracker display
        tracker_canvas_context.fillRect(x_pos-configuration['satellite_size']['value']/2,y_pos-configuration['satellite_size']['value']/2, configuration['satellite_size']['value'], configuration['satellite_size']['value']);
        
        // Plot the satellite names
        if (configuration['show_satellite_names']['value']=='1'){
            tracker_canvas_context.font = "10px Arial";
            tracker_canvas_context.fillStyle = '#'+configuration['satellite_label_color']['value'];
            text_x_pos = x_pos + configuration['satellite_size']['value']/2 + 3; // Move label 3px to the right of indicator
            text_y_pos = y_pos + configuration['satellite_size']['value']/2;
            text_width = tracker_canvas_context.measureText(curr_satellite_name).width;
            if ((text_x_pos+text_width)>tracker_canvas_width){
                // Label off the page, flip it to the other side of the indicator
                text_x_pos = x_pos - configuration['satellite_size']['value']/2 - text_width - 3;
            }
            tracker_canvas_context.fillText(curr_satellite_name, text_x_pos, text_y_pos);
        }
        
        // Plot the satellite footprint if needed
        if (curr_satellite_name==selected_satellite){
            if (configuration['show_satellite_footprint']['value']=='1'){
                PLib.calcFootPrint(retroTrack.footprint, 360, curr_satellite_info.latitude, curr_satellite_info.longitude, curr_satellite_info.altitude, 0.0 );
				tracker_canvas_context.beginPath();
				last_x_pos = null;
				first_x_pos = null;
				first_y_pos = null;
                for (satellite_footprint_count=0; satellite_footprint_count<360; satellite_footprint_count++){
                    footprint_x_pos = Math.round((retroTrack.footprint[satellite_footprint_count].lon + 180) / 360 * tracker_canvas_width);
                    footprint_y_pos = Math.round((180 - (retroTrack.footprint[satellite_footprint_count].lat + 90))  / 180 * tracker_canvas_height);
					
					if (satellite_footprint_count==0){
						tracker_canvas_context.moveTo(footprint_x_pos, footprint_y_pos);
						first_x_pos = footprint_x_pos;
						first_y_pos = footprint_y_pos;
					} else {
						if (Math.abs(footprint_x_pos-last_x_pos)<=(tracker_canvas_width/3)){
							// Loop didn't have to jump to other side of map, so draw. 
							tracker_canvas_context.lineTo(footprint_x_pos, footprint_y_pos);
						}
						tracker_canvas_context.moveTo(footprint_x_pos, footprint_y_pos);
					}
					
					last_x_pos = footprint_x_pos;
                }
				if (Math.abs(footprint_x_pos-first_x_pos)<=(tracker_canvas_width/3)){
					tracker_canvas_context.lineTo(first_x_pos, first_y_pos);
				}
				
				tracker_canvas_context.lineWidth = 1;
				tracker_canvas_context.strokeStyle = "#"+configuration['satellite_footprint_color']['value'];
				tracker_canvas_context.stroke();
            }
        }
    }