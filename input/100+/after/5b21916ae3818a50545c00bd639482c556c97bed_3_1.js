function(Image, Table, TextBox, WebFrame, Video) {
  var ComponentFactory;
  return ComponentFactory = {
    createTextBox: function(configuration) {
      return new TextBox(configuration);
    },
    createImage: function(configuration) {
      return new Image(configuration);
    },
    createWebFrame: function(configuration) {
      return new WebFrame(configuration);
    },
    createVideo: function(configuration) {
      return new Video(configuration);
    },
    create: function(rawComp) {
      switch (rawComp.type) {
        case "ImageModel":
          return new Image(rawComp);
        case "TextBox":
          return new TextBox(rawComp);
        case "Video":
          return new Video(rawComp);
      }
    }
  };
}