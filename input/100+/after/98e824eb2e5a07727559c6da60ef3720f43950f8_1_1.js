function(e, el, next) {
    var list, newModel, text;
    type = $(el).attr('data-task-type');
    list = model.at("_" + type + "List");
    newModel = model.at('_new' + type.charAt(0).toUpperCase() + type.slice(1));
    if (!(text = view.escapeHtml(newModel.get()))) {
      return;
    }
    newModel.set('');
    switch (type) {
      case 'habit':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 0,
          up: true,
          down: true
        });
      case 'reward':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 20
        });
      case 'daily':
      case 'todo':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 0,
          completed: false
        });
    }
  }