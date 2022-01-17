function (model, extra_params, form_name) {
  if (arguments.length == 2) {
  	form_name = extra_params;
  	extra_params = null;
  }
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
  if (extra_params) params = _.extend({}, params, extra_params);
  return forms.create(params);
}