function(content, options) {
    /*
      @name controller.BaseController#respond
      @public
      @function
      @description Performs content-negotiation, and renders a response.
      @param {Object|String} content The content to use in the response.
      @param {Object} [options] Options.
        @param {String} [options.format] The desired format for the response.
        @param {String} [options.template] The path (without file extensions)
          to the template to use to render this response.
        @param {String} [options.layout] The path (without file extensions)
          to the layout to use to render the template for this response.
    */
    var self = this
      , options = options || {}
      , formatParam = typeof options == 'string' ? options : options.format
      , negotiated = _negotiateContent.call(this, formatParam)
      , format
      , contentType
      , callback;

    callback = function(formattedContent) {
      _doResponse.apply(self, [200, {'Content-Type': contentType}, formattedContent]);
    };

    // Error during content negotiation may result in an error response, so
    // - don't continue
    if(this.completed) return;

    format = negotiated.format;
    contentType = negotiated.contentType;

    // If no content type could be found we can't use it
    if(!contentType) {
      var err = new geddy.errors.NotAcceptableError('Not an acceptable media type.');
      this.error(err);
      return;
    }

    if(!format) {
      _throwUndefinedFormatError.call(this);
      return;
    }

    // Set template and layout paths
    if(options.template) {
      if(options.template.match('app/views/')) {
        // If template includes full views path just use it
        this.template = options.template;
      }
      else if(options.template.match('/')) {
        // If it includes a '/' and it isn't the full path
        // Assume they are using the `controller/action` style
        this.template = 'app/views/' + options.template;
      }
      else {
        // Assume they only included the action, so add the controller path
        this.template = 'app/views/' + geddy.string.decapitalize(this.params.controller) +
          '/' + options.template;
      }
    }
    if(options.layout) {
      if(options.layout.match('app/views')) {
        // If layout includes `app/views` just return it
        this.layout = options.layout;
      }
      else if(options.layout.match('/')) {
        // If it includes a '/' and it isn't the full path
        // Assume they are using the `controller/action` style
        this.layout = 'app/views/' + options.layout;
      }
      else {
        // Assume they only included the action, so add the controller path
        this.layout = 'app/views/layouts/' + options.layout;
      }
    }

    // If options.layout is set to `false` just set it
    if(typeof options.layout === 'boolean' && !options.layout) this.layout = options.layout;

    // Hand content off to formatting along with callback for writing out
    // the formatted respnse
    response.formatContent(format, content, this, callback);
  }