function get_field(path, form_name) {
  var _field = null;
  if (!(path.options && path.options.forms)) return null;
  var forms = path.options.forms;
  if (!(forms[form_name] || forms['all'])) return null;

  var _options = _.extend({}, forms['all'], forms[form_name]);
    
  if (_options.type) {
    _field = (typeof _options.type === 'string') ? fields[_options.type] : _options.type
  }
  if (!_field) {
    _field = convert_mongoose_field( path.options.type ? path.options.type.name : path.instance );
  }
  if (!_field) {
    throw new Error('Model does not have forms.type, probably on a virtual', path);
  }
  var _fields = {}
  _fields[path.path] = _field(_options = _.defaults(_options, {
    required: path.options.required || path.options.unique
  }));
  if (_options.confirm) {
    _fields[path.path + '.confirm'] = _field(_.extend({}, _options, {
      validators: [validators.matchField(path.path)]
    }));
  }
  if(_options.existing) {
    _fields[path.path + '.existing'] = _field(_.extend({}, _options, {
      validators: [function (form, field, callback) {
        if (!form.existing)
          return callback('Server error');
        var existing = form.existing[path.path];
        if (typeof existing === 'function') {
          existing(field.data, function (err, result) {
            if (err) return callback('Server error: ' + err);
            if (!result) return callback('Does not match existing value!!!');
            callback();
          });
        } else if (form.existing[field.name] != field.data) {
            return callback('Does not match existing value!');
        } else {
          callback();
        }
      }]
    }));
  }
  return _fields;
}