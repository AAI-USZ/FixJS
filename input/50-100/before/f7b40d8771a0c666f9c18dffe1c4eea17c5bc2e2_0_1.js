function(name){
    name = (name && name.toLowerCase()) || 'default';
    this.doctype = doctypes[name] || '<!DOCTYPE ' + name + '>';
    this.terse = 'default' == name || '5' == name || 'html' == name;
    this.xml = 0 == this.doctype.indexOf('<?xml');
  }