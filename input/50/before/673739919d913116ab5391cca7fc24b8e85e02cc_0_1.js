function(evt) {
        if (!this.value) {
            $("#location_search_input").val("");
            $(this).val(tm.initial_location_string);
        }    
    }