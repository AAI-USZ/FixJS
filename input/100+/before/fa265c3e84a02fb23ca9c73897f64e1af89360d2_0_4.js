function () {
    if (jQuery("#googlemap .data").length != 0) {
		// 
		// MAP INIT
		//
        var data_name = jQuery.parseJSON(jQuery("#googlemap .data").text());
        if (typeof(data_name) != "string") {
            // Take the first argument from a list or object.
            data_name = data_name[0];
        }
        var data_id = "#" + data_name;
    
        jQuery(data_id).bind(
            "dataIsReady",
            function (event, data) {
                if (typeof PNWMOTHS.Map.map === "undefined") {
                    PNWMOTHS.Map.map = PNWMOTHS.Map.initialize();
                    google.maps.event.addListenerOnce(PNWMOTHS.Map.map, 'idle', function() {
                          google.maps.event.trigger(PNWMOTHS.Map.map, 'resize');
                            PNWMOTHS.Map.markers = PNWMOTHS.Map.makeMarkers(data, PNWMOTHS.Map.map);
                    });
                } else {
                    PNWMOTHS.Map.openIB.close();
                    PNWMOTHS.Map.markers.setMap(null);
                    delete PNWMOTHS.Map.markers;
                    PNWMOTHS.Map.markers = PNWMOTHS.Map.makeMarkers(data, PNWMOTHS.Map.map);
                }
            });
			
		    // Initialize filters.
		PNWMOTHS.Filters.initialize("#filters");

		// Define filters.
		filters = [
			{"name": "county", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Counties", "selectedText": "Filtering on # counties", "ajax": true},
			{"name": "state", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "States", "selectedText": "Filtering on # states", "ajax": true},
			{"name": "collection", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Collections", "selectedText": "Filtering on # collections", "ajax": true},
			{"name": "record_type", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Voucher Types", "selectedText": "Filtering on # types", "ajax": true},
			{"name": "date", "type": PNWMOTHS.Filters.DateRangeFilter, "bounds": {min:new Date(1900,0,1), max:new Date()}},
			{"name": "year", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Years", "selectedText": "Filtering on # years", "ajax": true},
			{"name": "month", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Months", "selectedText": "Filtering on # months", "ajax": true},
			{"name": "day", "type": PNWMOTHS.Filters.MultiSelectFilter, "noneSelectedText": "Days", "selectedText": "Filtering on # days", "ajax": true},
			{"name": "elevation", "type": PNWMOTHS.Filters.EditRangeFilter, "bounds": {min: 0, max: 10000}}
		];

                var init_filters = [];
		// Initialize each filter based on its type.
		jQuery.each(filters, function (index, filterConfig) {
			var filter = new filterConfig.type(filterConfig);
                        init_filters.push(filter);
			filter.initialize();
			// Option filters rely on externally loaded data for their options.
			if (filter.ajaxPopulate) {
				// When the data for this option filter is ready, build the select
				// field with the options available in the data.
				jQuery("#" + filterConfig.name + "-data").bind("dataIsReady", filter.populate);
			}
		});

                jQuery("#f-reset").click(function() {
                    jQuery.each(init_filters, function(index, f) {
                        f.reset(false);
                    });
                    PNWMOTHS.Filters.filters = []; 
                    jQuery(document).trigger("requestData");
                });

                // TODO: rename event to filterData?
                // Setup custom events "requestData" and "dataIsReady". The latter initiates
                // a request to the data service passing any filters that have been
                // set. When the data is ready, the "dataIsReady" event is triggered.
                jQuery(document).bind("requestData", function (event) {
                        // Filter data locally and let all listeners know the data is ready.
                        jQuery(data_id).trigger(
                                "dataIsReady",
                                [PNWMOTHS.Filters.filterData(
                                        PNWMOTHS.Data.data[data_name],
                                        PNWMOTHS.Filters.filters
                                )]
                        );
                });
    }
}