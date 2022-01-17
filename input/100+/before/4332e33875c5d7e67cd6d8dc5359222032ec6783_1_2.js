function() {

    before(function(done) {
      DynamoDB.createProducts([
        {id: "updateTest", foo: "baz"}, 
        {id: "update2", nums: [1,2,3], age: 22},
        {id: "update3", foo: "bar", age: 22},
        {id: "update4", foo: "blah", age: 99, nums : [4,5,6], lname : 'tester'}
      ], done);
    });

    it('should update existing item and return its new values', function(done) {
      dynode.updateItem(DynamoDB.TestTable, "updateTest", {foo: "Bar"}, {ReturnValues: "UPDATED_NEW"}, function(err, resp) {
        resp.Attributes.should.eql({ foo: 'Bar' });
        done(err);
      });
    });

    it('should update existing Item by adding a number to a set of numbers', function(done) {
      dynode.updateItem(DynamoDB.TestTable, "update2", {nums: {add : [5]}, age: {add: 2}}, {ReturnValues: "UPDATED_NEW"}, function(err, resp) {
        var nums = resp.Attributes.nums.sort();
        nums.should.eql([1, 2, 3, 5]);
        resp.Attributes.age.should.eql(24);
        done(err);
      });
    });

    it('should delete age attribute', function(done) {
      dynode.updateItem(DynamoDB.TestTable, "update3", {age: {'Action' : "DELETE"}}, {ReturnValues: "ALL_NEW"}, function(err, resp) {
        resp.Attributes.should.eql({ id: 'update3', foo: 'bar' });
        should.not.exist(resp.Attributes.age);
        done(err);
      });
    });

    it('should delete attributes', function(done) {
      dynode.updateItem(DynamoDB.TestTable, "update4", {age: null, nums : [], lname : ''}, {ReturnValues: "ALL_NEW"}, function(err, resp) {
        resp.Attributes.should.eql({ id: 'update4', foo: 'blah' });
        should.not.exist(resp.Attributes.age);
        should.not.exist(resp.Attributes.nums);
        should.not.exist(resp.Attributes.lname);
        done(err);
      });
    });

  }