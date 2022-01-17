function(element, index) {
      return !this.isEqual(this.projects[index].contributors, this.getImages(element));
    }