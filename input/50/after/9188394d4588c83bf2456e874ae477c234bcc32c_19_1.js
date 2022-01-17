function() {
      var store = app.store('Account');
      list = subject.accountList;
      store._cached = fixtures;
      subject.render();
      result = subject.element.innerHTML;
    }