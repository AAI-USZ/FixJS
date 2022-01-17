function visit (record) {
      var node = record.node, completed, I, attr, attrs = record.attrs, protocol, blocks;
      stack.unshift(record);
      if (node.nodeType == 1) {
        for (I = node.attributes.length; record.loading < I; record.loading++) {
          attr = node.attributes.item(record.loading);
          switch (attr.namespaceURI || 0) {
          case "http://www.w3.org/2000/xmlns/":
            if (protocol = attr.nodeValue.split(/:/).shift()) {
              if (!"require".indexOf(protocol)) return requisite(attr);
              if (!"include".indexOf(protocol)) record.include = attr;
              if (!"layout".indexOf(protocol)) record.layout = attr;
            }
            break;
          case "stencil":
            return attribute(attr);
          case 0:
            attrs[attr.localName] = attr.nodeValue;
          }
        }
        if (record.include) {
          return include(record);
        }
        if (record.layout) {
          layout(record);
        }
        if (node.namespaceURI == layoutNS) {
          return block(record, node);
        } else if ("stencil" == node.namespaceURI && elements[node.localName]) {
          return elements[node.localName](record, node); 
        }
        for (attr in attrs) {
          node.setAttributeNS(null, attr, String(attrs[attr]));
        }
      } else if (node.nodeType == 4) {
        node.parentNode.replaceChild(document.createTextNode(node.nodeValue), node);
      }
      completed = children(node.firstChild);
      stack.shift();
      return completed;
    }