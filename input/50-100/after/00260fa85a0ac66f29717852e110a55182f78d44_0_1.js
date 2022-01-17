function(ev) {
  if (ev && ev.choice != null) {
    this.choice = ev.choice;
  }

  var data = this._getCompleterTemplateData();
  var template = this.template.cloneNode(true);
  domtemplate.template(template, data, { stack: 'completer.html' });

  util.clearElement(this.element);
  while (template.hasChildNodes()) {
    this.element.appendChild(template.firstChild);
  }
}