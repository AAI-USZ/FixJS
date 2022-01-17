function(data) {
	    if(data) {
	        instances = data.instances;
    		for (i= 0; i< instances.length; i++){
    			instances[i].b_x = 0;
				instances[i].b_y = 0;
				instances[i].b_xdx = 0;
				instances[i].b_ydy = 0;
    		}
                
	    }
	    else {
    		instances = [];
	    }

            // If there are pending instances then update the number we will
            // need to draw
            if (pending_instance == true) {
                    if (old_instance_length < instances.length) {
                            // New instances have arrived
                            // Need to decrement number of pending instances
                            var difference = instances.length - old_instance_length;
                            num_pending_instances = num_pending_instances - difference;
                            if (num_pending_instances == 0) {
                                    pending_instance = false;
                            }

                    } 
            }
            // Set the old length equal to the new length
            old_instance_length = instances.length;

            // Add the pending instances
	    if (num_pending_instances > 0) {
                    // Create a "dummy" pending instance
                    new_instance = new Object();
                    // worker_status is used to color instances and color depends on instance lifecycle
                    if (inst_lifecycle == 'spot') {
                        new_instance.worker_status = "open";
                    } else {
                        new_instance.worker_status = "creating";
                    }
                    new_instance.instance_state = "creating";
                    new_instance.ld = "0 0 0";
                    new_instance.time_in_state = "0m 0s";
                    new_instance.id = "i-00000000";
                    new_instance.instance_type = "Unknown";

                    // Add the dummy pending instance to the list of instances to be drawn
                    var i = 0;
                    for (i = 0; i < num_pending_instances; i++) {
                        instances.push(new_instance);
                    }
            }
            
	    renderGraph();
	    refreshTip();
	    window.setTimeout(update_cluster_canvas, 10000);
	}