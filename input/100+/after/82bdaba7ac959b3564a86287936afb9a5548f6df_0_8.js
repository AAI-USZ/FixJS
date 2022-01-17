function(curr_station_name){
        /*
        Plots the provided ground station on the canvas.
        
        @param curr_station_name: Name of the station to plot.
        */
        
        // Load the station
        temp_station = stations[curr_station_name];
        
        // Calculate the position of the station
        station_x_pos = Math.round((Number(temp_station['longitude'])+180)/360*tracker_canvas_width);
        station_y_pos = Math.round((180-(Number(temp_station['latitude'])+90))/180*tracker_canvas_height);
		
        // Decide what color it should be
        if (curr_station_name==selected_station){
            tracker_canvas_context.fillStyle = "#"+configuration['station_selected_color']['value'];
        } else {
            tracker_canvas_context.fillStyle = "#"+configuration['station_color']['value'];
        }
        
        // Draw the station
	tracker_canvas_context.beginPath();
        tracker_canvas_context.arc(station_x_pos, station_y_pos, configuration['satellite_size']['value']/2, 0, Math.PI*2, true);
        tracker_canvas_context.closePath();
	tracker_canvas_context.fill();
		
		// Draw the labels
        if (configuration['show_station_names']['value']=='1'){
            tracker_canvas_context.font = "10px Arial";
            tracker_canvas_context.fillStyle = '#'+configuration['station_label_color']['value'];
            text_x_pos = station_x_pos + configuration['satellite_size']['value']/2 + 3; // Move label 3px to the right of indicator
            text_y_pos = station_y_pos + configuration['satellite_size']['value']/2;
            text_width = tracker_canvas_context.measureText(curr_station_name).width;
            if ((text_x_pos+text_width)>tracker_canvas_width){
                // Label off the page, flip it to the other side of the indicator
                text_x_pos = x_pos - configuration['satellite_size']['value']/2 - text_width - 3;
            }
            tracker_canvas_context.fillText(curr_station_name, text_x_pos, text_y_pos);
        }
		
	// Show the footprint for every station
	if (configuration['show_station_footprint']['value']=='1'){
	    tracker_canvas_context.fillStyle = "#"+configuration['station_footprint_color']['value'];
	    PLib.configureGroundStation(Number(temp_station['latitude']),Number(temp_station['longitude']));
	    selected_satellite_info = PLib.QuickFind(selected_satellite);
	    PLib.calcFootPrint(retroTrack.footprint, 360, Number(temp_station['latitude']), Number(temp_station['longitude']), selected_satellite_info.altitude, 0.0);
	    tracker_canvas_context.beginPath();
	    last_x_pos = null;
	    first_x_pos = null;
	    first_y_pos = null;
	    for (footprint_counter=0; footprint_counter<360; footprint_counter++){
		x_pos = Math.round((retroTrack.footprint[footprint_counter].lon+180)/360*tracker_canvas_width);
		y_pos = Math.round((180-(retroTrack.footprint[footprint_counter].lat+90))/180*tracker_canvas_height);
		//tracker_canvas_context.fillRect(x_pos,y_pos,1,1);
		
		if (footprint_counter==0){
		    tracker_canvas_context.moveTo(x_pos, y_pos);
		    first_x_pos = x_pos;
		    first_y_pos = y_pos;
		} else {
		    if (Math.abs(x_pos-last_x_pos)<=(tracker_canvas_width/3)){
			// Loop didn't have to jump to other side of map, so draw. 
			tracker_canvas_context.lineTo(x_pos, y_pos);
		    }
		    tracker_canvas_context.moveTo(x_pos, y_pos);
		}
		
		last_x_pos = x_pos;
	    }
	    if (Math.abs(x_pos-first_x_pos)<=(tracker_canvas_width/3)){
		tracker_canvas_context.lineTo(first_x_pos, first_y_pos);
	    }
	    
	    tracker_canvas_context.lineWidth = 1;
	    tracker_canvas_context.strokeStyle = "#"+configuration['station_footprint_color']['value'];
	    tracker_canvas_context.stroke();
	}
    }