function () {
  var data = {
    id: this.id,
    keydash: this.keydash,
    elt: this.formElement,
    schema: this.schemaElement,
    node: this,
    value: this.value,
    escape: escapeHTML
  };
  var template = null;
  var html = '';

  // Complete the data context if needed
  if (this.ownerTree.formDesc.onBeforeRender) {
    this.ownerTree.formDesc.onBeforeRender(data, this);
  }
  if (this.view.onBeforeRender) {
    this.view.onBeforeRender(data, this);
  }

  // Use the template that 'onBeforeRender' may have set,
  // falling back to that of the form element otherwise
  if (this.template) {
    template = this.template;
  }
  else if (this.formElement && this.formElement.template) {
    template = this.formElement.template;
  }
  else {
    template = this.view.template;
  }

  // Wrap the view template in the generic field template
  // (note the strict equality to 'false', needed as we fallback
  // to the view's setting otherwise)
  if ((this.fieldtemplate !== false) &&
    (this.fieldtemplate || this.view.fieldtemplate)) {
    template = jsonform.fieldTemplate(template);
  }

  // Wrap the content in the child template of its parent if necessary.
  if (this.parentNode && this.parentNode.view &&
    this.parentNode.view.childTemplate) {
    template = this.parentNode.view.childTemplate(template);
  }

  // Prepare the HTML of the children
  var childrenhtml = '';
  _.each(this.children, function (child) {
    childrenhtml += child.generate();
  });
  data.children = childrenhtml;

  // Apply the HTML template
  html = _.template(template, data, fieldTemplateSettings);
  return html;
}