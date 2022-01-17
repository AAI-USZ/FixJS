function() {
    form = createForm(production ? {saveURL: 'production/' + production.uuid} : null);

    if (production.service) Source.setData(form, production.service);

    // Check if we are currently uploading
    var currentUpload = LocalStorage.get('currentUpload');
    if (currentUpload && currentUpload.uuid == production.uuid)
      production.input_file = currentUpload.input_file;

    ListFiles.setFile(form, production.input_file);

    getPresets(function(presets) {
      form.show('main', production, presets);
    });
  }