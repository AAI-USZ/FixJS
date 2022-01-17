function(rb){if(rep_name){var t=rb.current_loaded;var route_changed=(rb.current_route!=wn.get_route_str())
rb.load_criteria(rep_name);if(rb.dt&&route_changed){rb.dt.run();}}
if(!rb.forbidden){wn.container.change_to('Report Builder');}}