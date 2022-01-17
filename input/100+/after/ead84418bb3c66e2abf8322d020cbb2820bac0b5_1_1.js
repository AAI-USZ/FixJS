function View(options) {
    // extend Entity class for common methods
    util.extend(this, new Entity('View',  options));

    // Merge in default settings with provided options into the objects settings
    this.useSettings({
      // Whether or not to use the window the script is running in.
      useBaseWindow: false,
     // Changed if / when the window is opened, otherwise use primary window
      windowContext: window // (function(){return this;}())
    }, options);

    // If first param is false, do not open a window, use the original vegas
    // window to create the view. This is typical for the first view.
    this.settings('useBaseWindow', true);

    // Let the view know about its context.
    this._setViewContext();

    // If we shouldn't use the base window
    if (!this.settings('useBaseWindow')) {
      // then open the new window.
      this._openWindow();
    }
    else {
      // We are using a window thats already open, so its ready.
      this.trigger('load');
      util.info('Using current window for view');
    }

    var self = this;
    // When the view window has loaded.
    this.on('load', function () {
      util.info('View loaded');

      // Render the window
      self.render();

      //// Insert a region into the view
      //var region = self.createRegion({
        //regionSetting1: 'regionSetting1Value'
      //});

      //// Insert a component into the region
      //var component = region.createComponent({
        //title: 'title1'
      //});

      //// Insert a component into the region
      //var component = region.createComponent({
        //title: 'title2'
      //});

    });

    // Add the object to the collection
    this.collection().add(this);

  }