function() {
            var userid;
            if (!entityID || entityID == sakai.data.me.user.userid) {
                isMe = true;
                userid = sakai.data.me.user.userid;
            } else {
                userid = entityID;
            }
            privurl = '/~' + sakai.api.Util.safeURL(userid) + '/private/privspace';
            puburl = '/~' + sakai.api.Util.safeURL(userid) + '/public/pubspace';
            if (isMe) {
                sakai.api.Communication.getUnreadMessagesCountOverview('inbox', function(success, counts) {
                    messageCounts = counts;
                    continueLoadSpaceData(userid);
                });
            } else {
                continueLoadSpaceData(userid);
            }
        }