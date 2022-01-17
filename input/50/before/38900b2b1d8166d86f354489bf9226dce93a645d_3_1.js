function() {
                    $.ajax({
                        url: "/system/me",
                        cache: false,
                        success: function(data) {
                            if (!data.user.userid) {
                                document.location = "/";
                            }
                        }
                    });
                }