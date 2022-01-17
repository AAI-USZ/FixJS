function(done) {
      DynamoDB.createProducts([
        {id: "updateTest", foo: "baz"}, 
        {id: "update2", nums: [1,2,3], age: 22},
        {id: "update3", foo: "bar", age: 22},
        {id: "update4", foo: "blah", age: 99, nums : [4,5,6], lname : 'tester'}
      ], done);
    }