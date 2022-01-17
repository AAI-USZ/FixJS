function (result) {
          var e = node.ownerDocument.createElement(node.getAttribute("element"));
          e.appendChild(node.ownerDocument.createTextNode(result));
          node.parentNode.insertBefore(e, node);
          node.parentNode.removeChild(node);
          resume();
        }