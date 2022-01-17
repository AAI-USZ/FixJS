function(e) {
      var ele = e.target;
      window.console.log('Clicked!!!',ele.tagName);

      if(ele.tagName === 'INPUT') {
        if(ele.checked === true) {
          window.console.log('Contact has been selected',ele.name);
          selectedContacts[ele.name] = myFriendsByUid[ele.name];
        }
        else {
            window.console.log('Contact has been unselected',ele.name);
            delete selectedContacts[ele.name];
        }
      }
    }