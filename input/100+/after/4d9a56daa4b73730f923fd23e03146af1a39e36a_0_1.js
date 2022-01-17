function () {
    var selectedItem = this.itemList.filter('.selected');
    if (selectedItem.length === 0) {
      return this.itemList.filter(':visible').first();
    } else {
      return selectedItem;
    }
  }