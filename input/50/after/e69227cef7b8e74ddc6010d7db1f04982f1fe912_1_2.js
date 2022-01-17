function(tag) {
        return !tag.isNew() && tag.get('name').toLowerCase() == name;
      }