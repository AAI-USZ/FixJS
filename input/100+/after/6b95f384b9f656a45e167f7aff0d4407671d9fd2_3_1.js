function(done){
        var db = start({ noErrorListener: 1 });

        var DefaultErrSchema = new Schema({});
        DefaultErrSchema.pre('save', function (next) {
          try {
            next(new Error);
          } catch (error) {
            // throws b/c nothing is listening to the error event
            db.close();
            assert.ok(error instanceof Error);
            done();
          }
        });
        var DefaultErr = db.model('DefaultErr1', DefaultErrSchema, 'default_err_' + random());
        new DefaultErr().save();
      }