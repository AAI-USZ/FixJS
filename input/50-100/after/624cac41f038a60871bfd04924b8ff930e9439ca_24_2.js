function(e){
                e.preventDefault();
                window.scrollTo(0,0);
                $(document).trigger('init.deletecontent.sakai', [{
                        "paths": [sakai_global.content_profile.content_data.data._path]
                    },
                    function (success) {
                        if (success) {
                            // Wait for 2 seconds
                            setTimeout(function () {
                                // Relocate to the my sakai page
                                document.location = "/me";
                            }, 2000);
                        }
                    }]
                );
                $('#entity_contentsettings_dropdown').jqmHide();
            }