function() {
          fimo.page.create(fimo.views.jumbleObject(_.extend(_this.instanceArguments, {
            jumbleFriendsMessage: $('#message').val(),
            jumbleSelectedFriends: $('#friends').val()
          })));
          return false;
        }