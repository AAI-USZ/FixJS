function(name) {
      name = name.toLowerCase();
      var res = this.find(function(tag) {
        return !tag.isNew() && tag.get('name').toLowerCase() == name;
      });
      return (res == undefined);
    }