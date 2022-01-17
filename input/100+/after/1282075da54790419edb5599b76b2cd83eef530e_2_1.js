function(params) {
  params = params || {};

  // Try to require Jade or error out
  try {
    // Note: This isn't actually used here
    // - mainly it's here so we can use geddy errors to error out with
    require('handlebars');
  } catch(err) {
    new errors.viewError('handlebars');
  }

  this.mode = null;
  this.truncate = false;
  this.templato = params.templato;
  this.afterLoaded = params.afterLoaded;
  this.source = '';
  this.markup = undefined;
  this.templateText = params.text;
}