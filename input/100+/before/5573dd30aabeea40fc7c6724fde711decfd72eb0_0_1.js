function(name, submodule, module) {
    module = module || 'generic';
    submodule = submodule || 'general';
    var values = [];
    if (_.isArray(name)) {
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
        return arguments.callee(name, 'general', module);
      } else if (module !== 'generic') {
        return arguments.callee(name, 'general', 'generic');
      } else {
        console.log('i18n didn\'t find '+name);
        return name+'(not translated)';
      }
    }
  }