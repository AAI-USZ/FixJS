function() {
        var _this = this;
        if (this.instanceArguments['jumbleFriendsMessage']) {
          $('#message').val(this.instanceArguments['jumbleFriendsMessage']);
        }
        $('#friendsLink').click(function() {
          if (fimo.device.getAgent() === "browser") {
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
          fimo.page.create(fimo.views.jumbleObject(_.extend(_this.instanceArguments, {
            jumbleFriendsMessage: $('#message').val(),
            jumbleSelectedFriends: $('#friends').val()
          })));
          return false;
        });
      }