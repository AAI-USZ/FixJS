function (name) {
    if ( ! name) {
      return $();
    }
    if (name instanceof jQuery) {
      return name;
    }
    var $form = this.view.$el;
    var $el = $('input[data-link="'+name+'"]', $form);
    
    if ($el.length === 0) {
      $el = $('input[name="'+name+'"]', $form);
    }
    return $el;
  }