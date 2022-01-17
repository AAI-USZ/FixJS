function(req) {

  var preset = Data.prepare(presets[req.uuid]);
  preset.preset = true;
  preset.baseURL = 'preset';

  View.getMain().push('preset', new View.Object({
    title: preset.preset_name,
    content: UI.render('data-detail', preset),
    action: {
      title: 'Edit',
      url: '/preset/edit/' + preset.uuid
    }
  }));

}