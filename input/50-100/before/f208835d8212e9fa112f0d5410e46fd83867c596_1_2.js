function(lang) {
      document.documentElement.lang = lang;
      var total = pageHelper.total();
      for (var i = 0; i < total; i++) {
        pages.list[i].translate();
      }
    }