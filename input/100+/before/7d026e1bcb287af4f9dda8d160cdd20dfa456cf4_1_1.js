function(pathId, listener, type, local, options, value, index, arg) {
      var id = listener[0]
        , el = dom.item(id);

      // Fail and remove the listener if the element can't be found
      if (!el) return false;

      var method = listener[1]
        , property = listener[2]
        , partial = listener.partial
        , path = pathMap.paths[pathId]
        , triggerId;
      if (method === 'propPolite' && local) method = 'prop';
      if (partial) {
        triggerId = id;
        if (method === 'html' && type) {
          if (partial.type === 'each') {
            // Handle array updates
            method = type;
            if (type === 'append') {
              path += '.' + (index = model.get(path).length - 1);
              triggerId = null;
            } else if (type === 'insert') {
              path += '.' + index;
              triggerId = null;
            } else if (type === 'remove') {
              partial = null;
            } else if (type === 'move') {
              partial = null;
              property = arg;
            }
          } else {
            value = model.get(path)
          }
        }
      }
      if (listener.getValue) {
        value = listener.getValue(model, path);
      }
      if (partial) {
        value = partial(listener.ctx, model, path, triggerId, value, index, listener);
        if (value == null) return;
      }
      if (value == null) value = '';
      dom.update(el, method, options && options.ignore, value, property, index);
    }