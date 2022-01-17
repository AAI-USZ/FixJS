function () {
    console.log('must be able to access the collection');
    debugger;
    var collectionName = utils.pluralize(this.getName()).toLowerCase();

    if (collectionName in vegas) {
      return vegas[collectionName];
    }
    else {
      console.error('Could not get collection for' + this.entityName);
      return false;
    }
  }