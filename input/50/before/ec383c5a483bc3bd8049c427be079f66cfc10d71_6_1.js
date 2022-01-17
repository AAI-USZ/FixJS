function View(options) {
    utils.extend(this, new Entity(this.constructor.name, options));

    // Add the object to the collection
    //this.collection().add(this);
  }