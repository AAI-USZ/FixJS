function(destination, path, type_, callback) {
  var type = (typeof(type_) == 'string' ? type_ : null);
  var callback_ = arguments[arguments.length - 1];
  callback = (typeof(callback_) == 'function' ? callback_ : noop);

  if (isWindows && type === 'junction') {
    destination = pathModule._makeLong(destination);
  }

  binding.symlink(destination,
                  pathModule._makeLong(path), type, callback);
}