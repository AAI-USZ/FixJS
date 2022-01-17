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
  this.templateText = params.text;
}