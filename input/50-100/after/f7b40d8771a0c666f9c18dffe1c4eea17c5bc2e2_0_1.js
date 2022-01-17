function(name){
    name = (name && name.toLowerCase()) || 'default';
    this.doctype = doctypes[name] || '<!DOCTYPE ' + name + '>';
    this.terse = this.doctype.toLowerCase() == '<!doctype html>';
    this.xml = 0 == this.doctype.indexOf('<?xml');
  }