function(done) {
    var test = function() {
      waitTen(function() {
        this.x = 5;
      });
      cancel();
    };

    function cancel() {
      throw new Error("Cancelled");
    }

    function waitTen(callback) {
      setTimeout(callback, 10);
    }

    var self = {};

    asyncEval(funcToString(test), {this: self, asyncFunctions: { waitTen: waitTen }}, function(err) {
      setTimeout(function() {
        expect(this.x).to.not.exist;
        done();
      }, 100);
    });
  }