function() {
    var model = new Calendar.Models.Account();
    var store = app.store('Account');
    store._accounts['1'] = model;

    var data = subject._updateModel('1');

    assert.equal(model, data);
  }