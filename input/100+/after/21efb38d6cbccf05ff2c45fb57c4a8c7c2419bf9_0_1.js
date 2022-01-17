function(url,settings){

    if( settings.icons ) {
      settings.icons['smaller'] = path.resolve(settings.icons['smaller']);
      settings.icons['small'] = path.resolve(settings.icons['small']);
      settings.icons['big'] = path.resolve(settings.icons['big']);
      settings.icons['bigger'] = path.resolve(settings.icons['bigger']);
    }

    return createWindow(url,settings);
  }