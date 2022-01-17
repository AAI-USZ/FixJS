function(attributes, options) {

  attributes = attributes || {};

  if(this.defaults)
    attributes = _.extend({}, attributes, this.defaults);
  
  if(this.extendDefaults)
    attributes = this.extendDefaultAttributes(attributes, this.extendDefaults)

  this.attributes = attributes;

  this.cid = _.uniqueId('page');
  this.initialize.apply(this, arguments);

  this.packageme = require("packageme");

  if(!this.attributes.body && !this.attributes.content)
    throw new Error("'body' or 'content' is missing.\n"+JSON.stringify(this.attributes));

  // prepend root to any of given paths as well as calculate the root if it is missing.
  this.rootPaths();

  // convert  code, views, style attributes to packageme options
  this.packagemeOptions();
}