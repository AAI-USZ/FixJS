function(data, config) {
  var templateFileName;

  // Register all the helper functions to Templato
  Helpers.registerData.action(data);
  var i, helper;
  for(i in Helpers) {
    helper = Helpers[i];

    if(helper.name !== 'registerData') {
      // Create alternative helper name with opposite case style
      helper.altName = helper.altName || geddy.utils.string.snakeize(helper.name);

      // Register helper functions for view rendering
      Templato.registerHelper(helper.altName, helper.action);
      Templato.registerHelper(helper.name, helper.action);
    }
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