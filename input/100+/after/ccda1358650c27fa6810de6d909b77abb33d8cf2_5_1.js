function() {
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
        }