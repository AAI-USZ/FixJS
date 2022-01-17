function () {
      var app = this.model;
      app.get('Tree').on('change', this.render, this);
      app.get('Tree').on('infolder-search', this.refreshFolderView, this);
      app.on('change:path', this.render, this);
      app.on('change:state', this.toggleState, this);
      this.$container = $('<div />', {"class": "container"});
      this.$overlay = $('<div />', {"class": "overlay"});
      this.configView = new ConfigView({model:app.get('config')});
      this.$overlay.append(this.configView.el);
      var naviView = new NaviView({model:app});
      naviView.on('enterSearchInFolder', this.mayEnterNextPage, this);
      this.$el.append(
          naviView.el,
          this.$container,
          this.$overlay);
    }