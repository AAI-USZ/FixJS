function(ImageView, TableView, TextBoxView) {
  var ComponentViewFactory;
  return ComponentViewFactory = {
    createView: function(model) {
      var type;
      type = model.get("type");
      switch (type) {
        case "TextBox":
          return new TextBoxView({
            model: model
          });
        case "ImageModel":
          return new ImageView({
            model: model
          });
        case "Table":
          return new TableView({
            model: model
          });
      }
    }
  };
}