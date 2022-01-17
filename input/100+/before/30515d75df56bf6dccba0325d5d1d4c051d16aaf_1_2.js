function(e) {
      window.console.log('Importing all the contacts',selectedContacts.length);

      if(selectedContacts.length > 0) {
        owdFbInt.importAll(function() {
          window.console.log('All contacts have been imported');
          document.body.dataset.state = '';
          var req = navigator.mozContacts.find({});
          req.onsuccess = function(e) {
            window.console.log('Number of contacts:' , e.target.result.length);
          }
        });
      }
      else {
        window.console.log('No friends selected. Doing nothing');
      }
    }