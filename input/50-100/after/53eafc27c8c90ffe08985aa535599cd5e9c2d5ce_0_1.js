function(element, value, empty) {
    if (typeof(element) == 'string') element = '#' + element;
    this.replace_html(jQuery(element), value);
    jQuery(element).closest('td')[empty ? 'addClass' : 'removeClass']('empty');
  }