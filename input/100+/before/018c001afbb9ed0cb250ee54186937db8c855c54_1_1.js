function(content, options) {
    /*
      @name controller.BaseController#respond
      @public
      @function
      @description Performs content-negotiation, and renders a response.
      @param {Object|String} content The content to use in the response.
      @param {Object} [opts] Options.
        @param {String} [options.format] The desired format for the response.
        @param {String} [options.template] The path (without file extensions)
          to the template to use to render this response.
        @param {String} [options.layout] The path (without file extensions)
          to the layout to use to render the template for this response.
    */
    var self = this
      , options = options || {}
      , formatParam = typeof opts == 'string' ? options : options.format
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

    if(!contentType) {
      var err = new geddy.errors.NotAcceptableError('Not an acceptable media type.');
      this.error(err);
      return;
    }
    if(!format) {
      _throwUndefinedFormatError.call(this);
      return;
    }

    if(options.template) this.template = options.template;
    if(options.layout) this.layout = 'app/views/' + options.layout;

    // Hand content off to formatting along with callback for writing out
    // the formatted respnse
    response.formatContent(format, content, this, callback);
  }