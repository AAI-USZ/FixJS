function () {
    it('should throw when creating an invalid database', function () {
      var thisSpec = this;

      waitsForPromise(
        SQLite3JS.openAsync('invalid path').then(function (db) {
          thisSpec.fail('The error handler was not called.');
        }, function (error) {
          expect(error.resultCode).toEqual(SQLite3.ResultCode.cantOpen);
        })
      );
    });

    it('should throw when executing an invalid statement', function () {
      var thisSpec = this;

      waitsForPromise(
        db.runAsync('invalid sql').then(function () {
          thisSpec.fail('The error handler was not called.');
        }, function (error) {
          expect(error.resultCode).toEqual(SQLite3.ResultCode.error);
        })
      );
    });
  }