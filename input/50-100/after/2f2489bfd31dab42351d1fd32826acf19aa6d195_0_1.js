function() {
      var store = this.app.store('Account');
      var items = store.cached;
      var list = this.accountList;

      var key;
      var result = '';

      for (key in items) {
        if (key in items) {
          result += template.account.render(
            this._formatModel(items[key])
          );
        }
      }
      list.innerHTML = result;
    }