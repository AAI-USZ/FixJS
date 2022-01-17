function(params) {
  params = params || {};

  // Usually we would try to require the engine here,
  // - but we use a custom EJS implementation, so it's not needed

  this.mode = null;
  this.truncate = false;
  this.templato = params.templato;
  this.afterLoaded = params.afterLoaded;
  this.source = '';
  this.markup = undefined;
  // Note: If you don't want to use Fleegix.js,
  // override getTemplateTextFromNode to use
  // textarea node value for template text
  this.templateText = params.text || this.getTemplateTextFromNode(params.node);

  // Try to get from URL if no template text
  if(typeof this.templateText == 'undefined') {
    // If you don't want to use Fleegix.js,
    // override getTemplateTextFromUrl to use
    // files for template text
    this.getTemplateTextFromUrl(params);
  }
}