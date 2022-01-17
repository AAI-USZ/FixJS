function(attrs) {
      if(attrs.name && !this._isNameValid(attrs.name))
        return 'tag name is not valid';
    }