function(data, config) {
  var templateFileName;

  // Register all the helper functions to Templato
  geddy.viewHelpers.registerData(data); // Enables access to the current params for `urlFor`
  for(var i in geddy.viewHelpers) {
    Templato.registerHelper(i, geddy.viewHelpers[i]);
  }

  // Rendering a template in a layout
  if(config.layout) {
    this.isLayout = true;
    this.templateRoot = getDirName(config.layout);
    templateFileName = getFileName(config.layout);

    var self = this
      , templaterContent = new Templater()
      , contentPartial = '';

    // Add template content to buffer
    templaterContent.addListener('data', function(content) {
      contentPartial += content;

      // Define `yield` method
      Templato.registerHelper('yield', function() {
        return contentPartial;
      });
    });

    // Once template has been rendered create a partial for the layout
    templaterContent.addListener('end', function() {
      self.partial(templateFileName, data);
    });

    // Render the template
    templaterContent.render(data, {template: config.template});
  }
  // Rendering a template
  else {
    this.templateRoot = getDirName(config.template);
    templateFileName = getFileName(config.template);

    this.partial(templateFileName, data); // Create partial from template
  }
}