function(data, callback) {
    var self = this
      , templater = new Templater()
      , content = ''
      , dirName;

    // Format directory name
    dirName = geddy.inflection.pluralize(this.name);
    dirName = geddy.string.snakeize(dirName);

    // Get template if not set
    this.template = this.template ||
      'app/views/' + dirName + '/' + this.params.action;

    // Get layout if not set
    this.layout = this.layout || 'app/views/layouts/' + dirName;

    templater.addListener('data', function(data) {
      // Buffer for now, but we could stream
      content += data;
    });
    templater.addListener('end', function() {
      callback(content);
    });

    templater.render(data, {
        layout: this.layout
      , template: this.template
      , controller: this.name
      , action: this.params.action
    });
  }