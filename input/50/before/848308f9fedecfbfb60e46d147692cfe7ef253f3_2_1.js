function() {
                    if ( options["success_url"].length > 0) {
                        document.location = options["success_url"];
                    }
                    if(typeof options["success_callback"] == 'function') {
                        options["success_callback"].apply()
                    }
                }