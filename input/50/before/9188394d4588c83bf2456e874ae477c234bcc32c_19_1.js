function() {
      var store = app.store('Account');
      list = subject.accountList;
      store._accounts = fixtures;
      subject.render();
      result = subject.element.innerHTML;
    }