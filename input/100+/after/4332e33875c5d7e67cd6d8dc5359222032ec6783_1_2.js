function(done) {
      dynode.updateItem(DynamoDB.TestTable, "update5" {age:0}, {ReturnValues: "UPDATED_NEW"}, function(err, resp) {
        resp.Attributes.should.eql({ age: 0 });
        done(err);
      });
    }