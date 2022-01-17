function(callback) {
            if (editing && sakai.data.me.profile && $.isFunction(callback) && sakai.data.me.profile._fullProfileLoaded) {
                callback(true, sakai.data.me.profile);
            } else {
                sakai.api.User.getUser(userid, function(success, data) {
                    if (sakai.data.me.user.userid === data.userid) {
                        sakai.data.me.profile = data;
                        sakai.data.me.profile._fullProfileLoaded = true;
                    }
                    if ($.isFunction(callback)) {
                        callback(success, data);
                    }
                });
            }
        }