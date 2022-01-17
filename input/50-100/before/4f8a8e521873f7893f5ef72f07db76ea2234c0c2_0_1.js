function(f) {
          // givenName is put as name but it should be f.first_name
          var friendAsMozContact = { name: [f.name] , familyName: [f.last_name],
                        additionalName: [f.middle_name],
                        givenName: [f.first_name], uid:f.uid.toString()  };

          window.console.log('UID to be painted:', friendAsMozContact.uid);

          myFriendsByUid[f.uid.toString()] = friendAsMozContact;
          myFriends.push(friendAsMozContact);
        }