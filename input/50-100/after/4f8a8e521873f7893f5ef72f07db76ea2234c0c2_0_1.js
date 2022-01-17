function(f) {
          // givenName is put as name but it should be f.first_name
          f.familyName = []; f.familyName[0] = f.last_name;
          f.additionalName = []; f.additionalName[0] = f.middle_name;
          f.givenName = []; f.givenName[0] = f.first_name;
          f.uid = f.uid.toString();

          myFriendsByUid[f.uid] = f;
          myFriends.push(f);
        }