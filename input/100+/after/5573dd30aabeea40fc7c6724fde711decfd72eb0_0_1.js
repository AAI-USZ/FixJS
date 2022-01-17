function(name, submodule, module) {
    module = module || 'generic';
    submodule = submodule || 'general';
    var values = [];
    var args1 = name;
    if (_.isArray(name)) {
      args1 = Array.prototype.slice.call(arguments[0]);
      values = name.slice(1);
      name = name[0];
    }
    var search_string = module+'.'+submodule+'.'+name;
    //console.log('looking for', search_string);
    var t = $.jsperanto.translate(search_string);
    if (t !== search_string) {
      if (values.length > 0) {
        return vsprintf(t, values);
      } else {
        return t;
      }
    } else {
      if (submodule !== 'general') {
        return arguments.callee(args1, 'general', module);
      } else if (module !== 'generic') {
        return arguments.callee(args1, 'general', 'generic');
      } else {
        console.log('i18n didn\'t find '+name);
        return name+'(not translated)';
      }
    }
  }