function isFavorite(contact) {
    return contact != null & contact.category != null &&
              contact.category.indexOf('favorite') != -1;
  }