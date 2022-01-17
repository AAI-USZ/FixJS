function (parent , elementpath){
        var xmlelement,
          xmlattribute,
          tmpattrib,
          l, m,
          child;
        if (!parent) { // this element is the root element
          this.fullName = elementpath.localName;
          this.name     = elementpath.nodeName;
          xmlelement    = this;
        } else { // this element has a parent
          xmlelement         = new XMLElement(elementpath.localName, elementpath.nodeName, "", "");
          xmlelement.parent  = parent;
        }

        // if this is a text node, return a PCData element, instead of an XML element.
        if(elementpath.nodeType === 3 && elementpath.textContent !== "") {
          return this.createPCDataElement(elementpath.textContent);
        }

        // bind all attributes
        for (l = 0, m = elementpath.attributes.length; l < m; l++) {
          tmpattrib    = elementpath.attributes[l];
          xmlattribute = new XMLAttribute(tmpattrib.getname,
                                          tmpattrib.nodeName,
                                          tmpattrib.namespaceURI,
                                          tmpattrib.nodeValue,
                                          tmpattrib.nodeType);
          xmlelement.attributes.push(xmlattribute);
        }

        // bind all children
        for (l = 0, m = elementpath.childNodes.length; l < m; l++) {
          var node = elementpath.childNodes[l];
          if (node.nodeType === 1 || node.nodeType === 3) { // ELEMENT_NODE or TEXT_NODE
            child = xmlelement.parseChildrenRecursive(xmlelement, node);
            if (child !== null) {
              xmlelement.children.push(child);
            }
          }
        }

        return xmlelement;
      }