function (node) {
      if (node.name === 'call') {
        nodeName = node.start.value;
        for(i=0; i < package.functionsToStrip.length; i++) {
          if (nodeName === package.functionsToStrip[i]) {
            node.wrap('');
          }
        }
      }
    }