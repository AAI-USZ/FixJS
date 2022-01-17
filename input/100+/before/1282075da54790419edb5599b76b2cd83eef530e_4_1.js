function(params) {
  params = params || {};

  // Try to require Jade or error out
  try {
    // Note: This isn't actually used here
    // - mainly it's here so we can use geddy errors to error out with
    require('handlebars');
  } catch(err) {
    throw "Mustache, Handlebars same thing, so we're installing Handlebars. http://is.gd/kYTJyS";
  }

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