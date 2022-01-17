function () {
    this.db.query({ method: 'POST', path: '_compact', body: {} }, function (err) {
      if (err) console.log('Failed to compact -- ' + err);
    });
  }