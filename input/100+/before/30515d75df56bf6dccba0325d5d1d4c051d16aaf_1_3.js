function(e) {
      var ele = e.target;
      window.console.log('Clicked!!!',ele.tagName);

      if(ele.tagName === 'INPUT') {
        if(ele.checked === true) {
          window.console.log('Contact has been selected',ele.name);
          selectedContacts.push(myFriends[ele.name]);
        }
        else {
            window.console.log('Contact has been unselected',ele.name);
            selectedContacts = selectedContacts.filter(function(e) {
              return e.uid !== myFriends[ele.name].uid;
            });
        }
      }
    }