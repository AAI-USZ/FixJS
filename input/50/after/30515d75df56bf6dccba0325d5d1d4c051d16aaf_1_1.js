function(e) {
      window.console.log('Selecting all Contacts');

      bulkSelection(true);

      selectedContacts = myFriendsByUid;

      selButton.textContent = 'Unselect All';
      selButton.onclick = UI.unSelectAll;
    }