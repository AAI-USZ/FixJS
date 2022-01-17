function(name, req, load, config) {
    
    if (name.substr(name.length - 1, 1) == '!') {
      name = name.substr(0, name.length - 2);
      load(css);
      return;
    }
      
    
    if (name.substr(0, 2) == '>>')
      throw 'CSS buffer points can only be defined for builds.';
    
    req(['text!' + name + '.css'], function(CSS) {
      css.add(CSS, name);
      load(css);
    });
  }