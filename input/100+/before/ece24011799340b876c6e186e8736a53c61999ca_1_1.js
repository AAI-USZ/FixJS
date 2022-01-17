function(store, data, presets) {
    var isProduction = (this.getDisplayType() == 'production');
    var isEditMode = this.isEditMode = !!data;
    var isNewProduction = (isProduction && !isEditMode);
    this.store = store;
    this.presets = presets;

    // This is a placeholder title created by the mobile app, remove it if possible
    if (isEditMode && isProduction && data.metadata.title == 'Mobile App: New Production') {
      data.metadata.title = '';
      isNewProduction = true;
    }

    var service = Source.getObject(store);
    var algorithms = Object.values(Object.map(API.getInfo('algorithms'), function(content, algorithm) {
      return Object.append({key: algorithm}, content);
    }));

    var uiData = {
      algorithm: algorithms,
      baseURL: this.getBaseURL(),
      name: this.getObjectName(data),
      output_basename: isEditMode && data.output_basename,
      presets: presets && Object.values(presets),
      service: (service ? service.display_type : null),
      input_file: ListFiles.getData(store).input_file,
      isNewProduction: isNewProduction
    };
    uiData[this.getDisplayType()] = true;

    var object = this.object = new View.Object({
      title: this.getObjectName(data) ||  'New ' + this.getDisplayName(),
      content: UI.render('form-main-new', uiData),
      back: (isEditMode ? {title: 'Cancel'} : null),
      action: {
        title: 'Save',
        onClick: this.bound('onActionClick')
      },

      onShow: this.bound('onShow'),
      onHide: this.bound('onHide')
    });

    store.eachView(function(view, type) {
      if (view.setup)
        view.setup(store, this.getBaseURL(), object);
    }, this);

    this.update(data);

    if (this.isEditMode) object.addEvent('show:once', (function() {
      this.updateAlgorithms(data);
    }).bind(this));

    if (isNewProduction) object.addEvent('show:once', (function() {
      var select = object.toElement().getElement(this.options.presetChooserSelector);
      if (select) select.addEvent('change', this.bound('onPresetSelect'));
    }).bind(this));

    View.getMain().push(object);

    this.isRendered = true;
  }