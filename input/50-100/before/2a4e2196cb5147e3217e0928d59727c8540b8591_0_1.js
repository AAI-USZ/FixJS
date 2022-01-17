function(model, el) {
      var presenterClass, type;
      type = model.get('type');
      if ((type != null) && type.match(/^\w+$/)) {
        presenterClass = eval("" + (type.capitalize()) + "Presenter");
        return new presenterClass(model, el);
      } else {
        return null;
      }
    }