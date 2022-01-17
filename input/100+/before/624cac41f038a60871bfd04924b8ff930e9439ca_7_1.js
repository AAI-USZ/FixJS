function(userid, callback){
            var authprofileURL = "/~" + sakai_util.safeURL(userid) + "/public/authprofile.profile.json";
            sakai_serv.loadJSON(authprofileURL, function(success, data) {
                if (success && data) {
                    callback(true, data);
                } else {
                    callback(false);
                }
            });
        }