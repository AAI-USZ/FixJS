function(e){
    var property = e.property;
    var ruleIds = this.get('ruleIds');
    var imageIndex = property.indexOf('background');

    if (imageIndex == -1) imageIndex = property.indexOf('background-image');

    ruleIds.push(e.id);
    if (imageIndex > -1) {
      this.collectImages(e, imageIndex);
    }
  }