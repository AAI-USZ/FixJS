function(name, req, load, config) {
    var suffix = name.match(/\[([^\]]*)\]/);
    
    if (suffix) {
      suffix = suffix[0];
      if (suffix != '')
        name = name.replace(/\[([^\]]*)\]/, '-$1');
      else
        name = name.replace(/\[([^\]]*)\]/, '');
    }
    
    //ignore suffix loads unless specifically enabled or empty suffix
    if (suffix && (suffix != '' || this.loadSuffixes.indexOf(suffix) == -1)) {
      load(css);
      return;
    }
      
    
    if (name.substr(0, 1) == '>')
      throw 'CSS buffer and write points can only be defined for builds.';
    
    req(['text!' + name + '.css'], function(CSS) {
      css.add(CSS, name);
      load(css);
    });
  }