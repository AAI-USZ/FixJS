function() {
                    $.ajax({
                        url: sakai_conf.URL.ME_SERVICE,
                        success: function(data) {
                            if (!data.user.userid) {
                                document.location = "/";
                            }
                        }
                    });
                }