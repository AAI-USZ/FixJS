function(resp) {
        model.trigger('destroy', model, model.collection, options);
        if (success) success(model, resp);
      }