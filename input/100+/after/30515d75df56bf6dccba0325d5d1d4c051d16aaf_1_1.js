function(response) {
      if(typeof response.error === 'undefined') {
        window.console.log('Friends:',response);

        myFriends = response.data[0].fql_result_set;

        myFriendsByUid = {};

        myFriends.forEach(function(f) {
          myFriendsByUid[f.uid.toString()] = f;
        });

        // My friends partners
        friendsPartners = parseFriendsPartners(response.data[1].fql_result_set);

        // Only append the first 10 friends to avoid collapsing the browser
        var pagedData = myFriends.slice(0,nextBlock);

        owd.templates.append('#myFbContacts',pagedData);

        document.body.dataset.state = '';
      }
      else {
        window.console.log('There has been an error, while retrieving friends'
                                                    ,response.error.message);
        if(response.error.code === 190) {
          window.console.log('Restarting the OAuth flow');
          startOAuth();
        }
      }
    }