function() {
    return {
      template: _.template("<p>Who would like this jumble? Invite at least 5 friends to get started, because jumblin alone ain't no fun.</p>\n<form id=\"jumblePeopleForm\">\n  <label>Invite your friends</label>\n  <a href=\"\" id=\"friendsLink\">Select from your contacts</a><br/>\n  <select name=\"friends\" multiple size=\"6\" id=\"friends\" style=\"display:none;\">\n  </select>\n  <label>Add a personal message (optional)</label>\n  <br/>\n  <input type=\"text\" name=\"message\" id=\"message\" placeholder=\"Hi! I just started a new jumble. Have a look. http://jum.bl/<%=jumbleName%>\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">next step</button>\n</form>"),
      onContactsSuccess: function(contacts) {
        return this.populateFriends(contacts);
      },
      onContactsError: function(contactError) {
        return alert("error: " + contactError);
      },
      populateFriends: function(friends) {
        var friend, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = friends.length; _i < _len; _i++) {
          friend = friends[_i];
          $('#friends').append("<option value='name'>" + friend.name.givenName + " " + friend.name.familyName + "</option>");
          _results.push($('#friends').show());
        }
        return _results;
      },
      loaded: function() {
        var extendInstanceArguments,
          _this = this;
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            jumbleFriendsMessage: $('#message').val(),
            jumbleSelectedFriends: $('#friends').val()
          });
        };
        if (this.instanceArguments['jumbleFriendsMessage']) {
          $('#message').val(this.instanceArguments['jumbleFriendsMessage']);
        }
        $('#friendsLink').click(function() {
          if (fimo.device.isBrowser()) {
            return _this.populateFriends([
              {
                name: {
                  givenName: "Lukas",
                  familyName: "Peyer"
                }
              }, {
                name: {
                  givenName: "Gabriel",
                  familyName: "Hase"
                }
              }
            ]);
          } else {
            fimo.device.ready(function() {
              var fields, options;
              options = new ContactFindOptions();
              options.filter = "";
              options.multiple = true;
              fields = ["displayName", "name", "emails", "phoneNumbers"];
              navigator.contacts.find(fields, _.bind(_this.onContactsSuccess, _this), _.bind(_this.onContactsError, _this), options);
              return false;
            });
            return false;
          }
        });
        $('#jumbleObjectForm').submit(function() {
          alert("not implemented yet");
          return false;
        });
        return $('#back').click(function() {
          extendInstanceArguments();
          fimo.controller['jumbleObject'](_this.instanceArguments);
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#object}");
      }
    }  });
