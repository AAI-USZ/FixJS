function(data, callback) {
    var self = this
      , templater = new Templater()
      , content = '';

    if(!this.template || !this.layout) {
      // Format directory names
      var dirName = geddy.inflection.pluralize(this.name);
      dirName = geddy.string.snakeize(dirName);
    }

    // Get template if not set
    this.template = this.template || 'app/views/' + dirName + '/' + this.params.action;

    // Get layout if not set or set empty layout if `false`
    if(typeof this.layout === 'boolean' && !this.layout) {
      // Use custom Geddy empty template in `lib/template/templates`
      this.layout = 'geddy/empty';
    } else {
      this.layout = this.layout || 'app/views/layouts/' + dirName;
    }

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