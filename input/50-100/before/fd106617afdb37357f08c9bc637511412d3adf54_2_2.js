function(e){
    var property = e.property;
    var imageIndex = property.indexOf('background');

    if (imageIndex == -1) imageIndex = property.indexOf('background-image');

    if (imageIndex > -1) {
      this.collectImages(e, imageIndex);
    }
  }