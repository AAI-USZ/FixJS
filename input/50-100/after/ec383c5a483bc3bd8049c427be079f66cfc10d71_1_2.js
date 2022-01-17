function () {
    var vegas = this.getContext('vegas');
    var collectionName = utils.pluralize(this.getName()).toLowerCase();

    if (collectionName in vegas && typeof(vegas[collectionName]) == 'function') {
      return vegas[collectionName]();
    }
    else {
      console.error('Could not get collection for' + this.entityName);
      return false;
    }
  }