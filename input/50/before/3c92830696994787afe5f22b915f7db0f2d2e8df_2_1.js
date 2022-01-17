function isAutoComplete() {
      return (priv.editProxy.data("typeahead") && priv.editProxy.data("typeahead").$menu.is(":visible"));
    }