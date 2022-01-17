function(e)  {
      window.console.log('Unselecting all the contacts');

      bulkSelection(false);

      selButton.textContent = 'Select All';
      selButton.onclick = UI.selectAll;

      selectedContacts = {};
    }