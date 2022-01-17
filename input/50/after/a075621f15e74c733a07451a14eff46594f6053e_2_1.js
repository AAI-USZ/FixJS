function(parentName) {
      var singularName = parentName.substring(0, parentName.length - 1);
      return parentName + ':' + req.params[singularName + 'Id'];
    }