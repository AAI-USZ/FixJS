function () {
    // Gather up variables for the template
    var vars = {
      title: this.settings('title') + this.getId(),
      id: this.getId(),
      entity: this.getEntityName()
    };

    return vars;
  }