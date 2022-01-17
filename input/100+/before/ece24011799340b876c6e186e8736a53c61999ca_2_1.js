function() {
    form = createForm(production ? {saveURL: 'production/' + production.uuid} : null);

    Source.setData(form, production.service);
    ListFiles.setFile(form, production.input_file);

    getPresets(function(presets) {
      form.show('main', production, presets);
    });
  }