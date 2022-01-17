function(result){
        if(result) {
            $.ajax({
                url: options["action_url"],
                type: options["type"],
                data: options["data"],
                success: function() {
                    if ( options["success_url"].length > 0) {
                        document.location = options["success_url"];
                    }
                    if(typeof options["success_callback"] == 'function') {
                        options["success_callback"].apply();
                    }
                },
                error: function() {
                    if(typeof options["error_callback"] == 'function') {
                        options["error_callback"].apply();
                    }
                }
            });
        } else {
            if(typeof options["cancel_callback"] == 'function') {
                options["cancel_callback"].apply();
            }
        }
    }