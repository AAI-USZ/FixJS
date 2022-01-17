function() {
    var that = this;

    this._thumbnailViews = [];

    this.dispatcher = this.options.dispatcher;
    this.dispatcher.on("select:template", this.setStoryTemplate, this);
    this.dispatcher.on("ready:templateSections", this.initializeStoryFromTemplate, this);
    this.dispatcher.on("ready:story", this.storyReady, this);
    this.dispatcher.on("save:story", this.save, this);
    this.dispatcher.on("select:thumbnail", this.showEditView, this);

    _.bindAll(this, 'addSectionThumbnail', 'setTemplateStory', 'setTemplateSections');

    this.template = Handlebars.compile(this.templateSource);

    if (this.model) {
      this.model.fetchSections({
        success: function(sections) {
          that.dispatcher.trigger("ready:story");
        }
      });
    }
  }