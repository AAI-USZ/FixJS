function(code) {
    var nodeName, i,
        burrito = require('burrito'),
        package = this;

    //do not burrito if no functionsToStrip (burrito jquery take more than 15 seconds on my laptop)
    if (this.functionsToStrip.length == 0) return code;

    return burrito(code, function (node) {
      if (node.name === 'call') {
        nodeName = node.start.value;
        for(i=0; i < package.functionsToStrip.length; i++) {
          if (nodeName === package.functionsToStrip[i]) {
            node.wrap('');
          }
        }
      }
    });
  }