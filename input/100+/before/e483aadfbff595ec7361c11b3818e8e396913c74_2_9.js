function(index, target){
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[inReverse ? nodes.length-i-1 : i];
          traverseNode(node, function (node) {
            if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript')) {
              window['eval'].call(window, node.innerHTML);
            }
          });
          if (copyByClone && index < size - 1) node = node.cloneNode(true);
          insert(operator, target, node);
        }
      }