function() {
    var getData;
    getData = function(arr) {
      return arr[0];
    };
    eq(getData([1, 2, 3]), 1);
    eq(getData(["foo", 2, 3]), "foo");
    throws((function() {
      return getData([null, "string"]);
    }));
    throws((function() {
      return getData([{}, 1, 2, 3]);
    }));
    return throws((function() {
      return getData({
        test: [1, 2, 3]
      });
    }));
  }