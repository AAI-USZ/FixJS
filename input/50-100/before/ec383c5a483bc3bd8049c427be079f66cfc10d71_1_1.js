function Entity(name, options) {

    this.setName(name);

    this.setId();

    this.settings('collection', this.getPluralName());

    this.collection().add(this);

    this.setContextInfo(this.getSingularName(), options);

  }