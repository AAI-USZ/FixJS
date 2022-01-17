function (callback) {
    var self = this;

    this.Phone = persist.define("Phone", {
      "number": { type: type.STRING, dbColumnName: 'numbr' }
    });

    this.PrimaryKeyTest = persist.define("PrimaryKeyTest", {
      "id": { dbColumnName: 'my_pk_id' },
      "name": type.STRING
    });

    this.testDate1 = new Date(2011, 10, 30, 12, 15);
    this.testDate2 = new Date(2011, 10, 30, 12, 15);

    this.Person = persist.define("Person", {
      "name": type.STRING,
      "age": type.INTEGER,
      "createdDate": { type: persist.DateTime, defaultValue: function () { return self.testDate1 } },
      "lastUpdated": { type: persist.DateTime }
    })
      .hasMany(this.Phone)
      .on('beforeSave', function (obj) {
        obj.lastUpdated = self.testDate2;
      })
      .on('afterSave', function (obj) {
        if (!obj.updateCount) obj.updateCount = 0;
        obj.updateCount++;
      });

    testUtils.connect(persist, function (err, connection) {
      self.connection = connection;
      callback();
    });
  }