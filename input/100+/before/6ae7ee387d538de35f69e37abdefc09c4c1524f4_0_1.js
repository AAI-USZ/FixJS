function(profile, userid) {
            var picture = "";
            if (profile.picture) {
                var picture_name = $.parseJSON(profile.picture).name;
                picture = "/~" + sakai.api.Util.safeURL(userid) + "/public/profile/" + picture_name;
            }
            return picture;
        }