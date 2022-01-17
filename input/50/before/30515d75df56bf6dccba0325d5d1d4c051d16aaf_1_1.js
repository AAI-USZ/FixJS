function(e) {
      window.console.log('Selecting all Contacts');

      bulkSelection(true);

      selectedContacts = myFriends.slice(0);

      selButton.textContent = 'Unselect All';
      selButton.onclick = UI.unSelectAll;
    }