function(callback) {
            // Get the service url from the config file
            var data_url = sakai_conf.URL.ME_SERVICE;
            // Start a request to the service
            $.ajax({
                url: data_url,
                cache: false,
                success: function(data) {
                    sakaiUserAPI.data.me = sakai_serv.convertObjectToArray(data, null, null);

                    // Check for firstName and lastName property - if not present use "rep:userId" for both (admin for example)
                    if (sakaiUserAPI.getProfileBasicElementValue(sakaiUserAPI.data.me.profile, "firstName") === "") {
                        sakaiUserAPI.setProfileBasicElementValue(sakaiUserAPI.data.me.profile, "firstName", sakaiUserAPI.data.me.profile["rep:userId"]);
                    }
                    if (sakaiUserAPI.getProfileBasicElementValue(sakaiUserAPI.data.me.profile, "lastName") === "") {
                        sakaiUserAPI.setProfileBasicElementValue(sakaiUserAPI.data.me.profile, "lastName", sakaiUserAPI.data.me.profile["rep:userId"]);
                    }

                    // SAKIII-2419 server isn't saving basic access param
                    if (sakaiUserAPI.data.me.profile.basic.access === undefined){
                        sakaiUserAPI.data.me.profile.basic.access = "everybody";
                    }

                    if (sakaiUserAPI.data.me.user.properties) {
                        if (sakaiUserAPI.data.me.user.properties.isAutoTagging) {
                            if (sakaiUserAPI.data.me.user.properties.isAutoTagging === "true") {
                                sakaiUserAPI.data.me.user.properties.isAutoTagging = true;
                            } else if (sakaiUserAPI.data.me.user.properties.isAutoTagging === "false") {
                                sakaiUserAPI.data.me.user.properties.isAutoTagging = false;
                            }
                        }
                        if (sakaiUserAPI.data.me.user.properties.sendTagMsg) {
                            if (sakaiUserAPI.data.me.user.properties.sendTagMsg === "true") {
                                sakaiUserAPI.data.me.user.properties.sendTagMsg = true;
                            } else if (sakaiUserAPI.data.me.user.properties.sendTagMsg === "false") {
                                sakaiUserAPI.data.me.user.properties.sendTagMsg = false;
                            }
                        }
                    }

                    // Call callback function if set
                    if ($.isFunction(callback)) {
                        callback(true, sakaiUserAPI.data.me);
                    }
                },
                error: function(xhr, textStatus, thrownError) {

                    // Log error
                    debug.error("sakai.api.User.loadMeData: Could not load logged in user data from the me service!");

                    if (xhr.status === 500 && window.location.pathname !== "/dev/500.html" && window.location.pathname !== "/500") {
                        document.location = "/500";
                    }

                    // Call callback function if set
                    if ($.isFunction(callback)) {
                        callback(false, xhr);
                    }
                }
            });
        }