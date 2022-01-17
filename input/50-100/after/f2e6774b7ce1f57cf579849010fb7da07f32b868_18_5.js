function toggleFavorite() {
    var favorite = !isFavorite(currentContact);
    toggleFavoriteMessage(favorite);
    if (favorite) {
      currentContact.category = currentContact.category || [];
      currentContact.category.push('favorite');
    } else {
      if (!currentContact.category) {
        return;
      }
      var pos = currentContact.category.indexOf('favorite');
      if (pos > -1) {
        delete currentContact.category[pos];
      }
    }
  }