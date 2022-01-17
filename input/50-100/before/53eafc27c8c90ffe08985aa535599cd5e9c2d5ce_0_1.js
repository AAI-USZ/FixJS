function(element, value, empty) {
    if (typeof(element) == 'string') element = '#' + element;
    this.replace_html(jQuery(element), value);
    if (empty) jQuery(element).closest('td').addClass('empty');
  }