function() {
      var videoType;
      Component.prototype.initialize.apply(this, arguments);
      this.set("type", "Video");
      videoType = FileUtils.type(FileUtils.extension(this.get('src')));
      return this.set("videoType", videoType);
    }