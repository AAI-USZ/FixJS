function isAutoComplete() {
      var typeahead = priv.editProxy.data("typeahead");
      if (typeahead && typeahead.$menu.is(":visible")) {
        return typeahead;
      }
      else {
        return false;
      }
    }