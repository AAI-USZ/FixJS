function(parentName) {
      var singularName = parentName.substring(0, parentName.length - 1);
      return singularName + ':' + req.params[singularName + '_id'];
    }