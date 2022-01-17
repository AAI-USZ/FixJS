function(file){
    var icon = ''
      , classes = [];

    if (useIcons && '..' != file) {
      icon = icons[extname(file)] || icons.default;
      icon = '<img src="data:image/png;base64,' + load(icon) + '" />';
      classes.push('icon');
    }

    return '<li><a href="'
      + join(dir, file)
      + '" class="'
      + classes.join(' ') + '"'
      + ' title="' + file + '">'
      + icon + file + '</a></li>';

  }