function(predicate, any, callback) {
    if (typeof any === 'function') {
      callback = any;
      any = false;
    }

    if (Array.isArray(predicate)) {
      var finder = naan.ncurry(this.node.find, any, 2);
      return async.map(predicate, finder, callback);
    } 

    if (typeof predicate !== 'object') {
      callback(new Error('Invalid Predicate'));
    }

    var matchers = Object.keys(predicate).reduce(function(matchers, key) {
      return matchers.push(util.format(" (n.%s! = {%s}) ", key, key)), matchers;
    }, []);

    var cypher = [ 
      "START n = node(*) WHERE", 
      matchers.join(any ? "or" : "and"), 
      "RETURN n"
    ].join(" ");

    var self = this;
    this.query(cypher, predicate, callback);
  }