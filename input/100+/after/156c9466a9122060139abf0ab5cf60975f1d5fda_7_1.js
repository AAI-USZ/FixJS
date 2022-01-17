function(meData) {
            // Start polling to keep session alive when logged in
            if (meData.user.userid) {
                setInterval(function() {
                    $.ajax({
                        url: "/system/me",
                        cache: false,
                        success: function(data) {
                            if (!data.user.userid) {
                                document.location = "/";
                            }
                        }
                    });
                }, 60000);
            }
        }