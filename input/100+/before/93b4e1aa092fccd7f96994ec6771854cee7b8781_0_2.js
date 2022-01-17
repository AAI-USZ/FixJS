function (model, extra_params, form_name) {
  var schema = model.schema
    , paths = schema.paths
    , virtuals = schema.virtuals
    , params = {};
  for (var pathName in paths) {
    var path = paths[pathName];
    var field = get_field(path, form_name);
    if (field)
      params = _.extend(params, field);
  }
  for (var virtName in virtuals) {
    var virt = virtuals[virtName];
    virt.path = virtName;
    var field = get_field(virt, form_name);
    if (field)
      params = _.extend(params, field);
  }
  params = _.extend({}, params, extra_params);
  var form = forms.create(params);
  return forms.create(params);
}