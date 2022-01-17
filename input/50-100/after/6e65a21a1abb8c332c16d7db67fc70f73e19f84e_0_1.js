function(object) {
    object = $(object);
    if ( id != 'JIATHISSWF' && $('param[name=movie]', object).length ) {
      var wrapper = object.before('<div class="flash-video"><div>').previous();
      $(wrapper).children().append(object);
    }
  }