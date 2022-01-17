function addToList(contact) {
    var newLi;
    var group = getGroupName(contact);

    var list = groupsList.querySelector('#contacts-list-' + group);

    addToGroup(contact, list);

    if (list.children.length === 2) {
      // template + new record
      showGroup(group);
    }

    // If is favorite add as well to the favorite group
    if (contact.category && contact.category.indexOf('favorite') != -1) {
      list = groupsList.getDocumentById('contacts-list-favorites');
      addToGroup(contact, list);

      if (list.children.length === 2) {
        showGroup('favorites');
      }
    }
  }