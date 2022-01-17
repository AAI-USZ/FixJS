function(model) {
    var _this = this;
    this.category = model.attributes.category;
    this.description = ko.computed(function() {
      kb.locale_change_observable();
      return model.attributes.description[kb.locale_manager.getLocale()];
    });
    this.href = model.attributes.href ? model.attributes.href : '#' + model.attributes.category + '-modal';
    this.name = model.attributes.name;
    this.id = model.attributes.id;
    this.id_button = model.attributes.id + '-button';
    this.id_text = model.attributes.id + '-text';
    this.modal = model.attributes.category + '-modal';
    this.shown = model.attributes.shown;
    this.products = kb.collectionObservable(model.products, {
      view_model: ProductViewModel
    });
    model.bind('change', function() {
      model.fetchProducts(kb.locale_manager.localeToURL(kb.locale_manager.getLocale()));
      return _this.products.collection(model.products);
    });
    return this;
  }