function(e, data, library) {
            if (isMe && data && data.length && library === sakai.data.me.user.userid) {
                $(window).trigger("lhnav.updateCount", ["library", data.length]);
            }
        }