function Entity(name, options) {

    this.setName(name);

    this.setContextInfo(this.getSingularName(), options);

    this.setId();

    this.settings('collection', this.getPluralName());

    this.collection().add(this);

  }