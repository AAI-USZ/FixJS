function(event, ui) {
        // Clear active_satellites
        active_satellites = [];
        selected_satellite = null;
        
        // Unselect all currently selected satellites
        $("#satellite_list").children().removeClass('ui-selected');
        
        // Loop through the selected groups and load their satellites
        $(this).children('.ui-selected').each(function(){
            // Loop through the active group's satellites
            group_id = $(this).attr('rel');
            for (satellite_index in groups[group_id]['satellites']){
                // Make sure the satellite is available
                if (groups[group_id]['satellites'][satellite_index]['id'] in satellites){
                    // Add the satellite to active_satellites
                    active_satellites[active_satellites.length] = groups[group_id]['satellites'][satellite_index]['name'];
                    
                    // Select the satellite in the menu
                    $("#select_satellite_"+groups[group_id]['satellites'][satellite_index]['id']).addClass('ui-selected');
                }
            }
            
            // Set the active satellite to the first one in the list
            selected_satellite = active_satellites[0];
        });
        
        // Reload the PLib Satellites
        retroTrack.setPlibSatellites();
        
        // Update plot
        retroTrack.updatePlot();
    }