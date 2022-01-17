function (element) {
    element = jQuery(element);

    var elementId = element.attr('id')

    var foundCollectionObject = false;
    this.collection().each(function (collectionObject) {
      if (collectionObject.getId() == elementId) {
        foundCollectionObject = collectionObject;
      }
    });

    return foundCollectionObject;

  }