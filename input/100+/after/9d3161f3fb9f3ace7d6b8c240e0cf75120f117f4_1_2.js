function(a, b, c, d, options) {
    var keywordArgs = _.map(_.keys(options.hash), function(k) {
      return k+':'+options.hash[k];
    });
    return [a, b, c, d].concat(keywordArgs).join(' ');
  }