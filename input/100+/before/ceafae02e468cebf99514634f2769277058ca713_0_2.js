function(window, $) {

    var onLogin = function(payload) {
            if (payload.authResponse != null) {
                cache.userID = payload.authResponse.userID;
                getAttendees(function() {
                    if (cache.attendees.indexOf(cache.userID) > -1) hasAttended();
                    drawPictures();
                });
            }   
        }

      , onStatusChange = function(payload) {
            if (payload.status != "connected") {
                FB.login(onLogin, {scope: permissions});
            } else {
                onLogin(payload);
            }
        }
      
      , init = function() {
            FB.init({
                appId      : appId,
                channelUrl : channelUrl,
                status     : false,
                cookie     : true,
                xfbml      : true
            });
            FB.getLoginStatus(onStatusChange);
            cache.attendees = [];
        }

      , getAttendees = function(callback) {
            FB.api("/" + eventId + "/attending", function(payload) {
                cache.attendees = $.map(payload.data, function(o) { return o.id; });
                callback();
            }); 
        }
      
      , drawPictures = function() {
            var $pics = $("#pics").empty();
            $.each(cache.attendees, function(i, id) {
                $pics.append($("<img src='https://graph.facebook.com/" + id + "/picture'/>"));
            });
        }

      , hasAttended = function() {
            $("#i-want-this-to-happen")
                .attr("disabled", "disabled")
                .html("YOU ARE ATTENDING AND AWESOME.");
        }
      
      , attend = function() {
            if (cache.attendees.indexOf(cache.userID) > -1) return;
            
            FB.api("/" + eventId + "/attending", "post", function(payload) {
                var index = cache.attendees.indexOf(cache.userID)
                  , error = payload.error;
                if (error.code == 104) {
                    FB.login(onLogin, {scope: permissions});
                } else if (error.code == 100) {
                    if (index > -1) {
                        cache.attendees.splice(index, 1);
                        drawPictures();
                    }
                }
            });
            
            if (cache.userID != null) {
                cache.attendees.push(cache.userID);
                drawPictures();
                hasAttended();
            }
        }
      
      , permissions = "user_events, rsvp_event, publish_actions"
      , appId = "101469336666147"
      , host = "hackcyprus.github.com"
      , channelUrl = "http://" + host + "/channel.html"
      , eventId = "330480227040505"
      , cache = {};

    window.fbAsyncInit = init;

    $("#i-want-this-to-happen").on("click", function() {
        attend();
    });

}