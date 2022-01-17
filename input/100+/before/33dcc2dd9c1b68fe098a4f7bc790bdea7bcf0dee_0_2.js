function (parent, elementpath){
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
          xmlelement         = new XMLElement(elementpath.nodeName);
          xmlelement.parent  = parent;
        }

        // if this is a text node, return a PCData element, instead of an XML element.
        if(elementpath.nodeType === 3 && elementpath.textContent !== "") {
          return this.createPCDataElement(elementpath.textContent);
        }

        // if this is a CDATA node, return a PCData element, with the data made safe
        if(elementpath.nodeType === 4) {
         return this.createPCDataElement(elementpath.textContent.replace('<',"&lt;").replace('>',"&gt;"));
        }

        // bind all attributes, if there are any
        if (elementpath.attributes) {
          for (l = 0, m = elementpath.attributes.length; l < m; l++) {
            tmpattrib    = elementpath.attributes[l];
            xmlattribute = new XMLAttribute(tmpattrib.getname,
                                            tmpattrib.nodeName,
                                            tmpattrib.namespaceURI,
                                            tmpattrib.nodeValue,
                                            tmpattrib.nodeType);
            xmlelement.attributes.push(xmlattribute);
          }
        }

        // bind all children, if there are any
        if (elementpath.childNodes) {
          for (l = 0, m = elementpath.childNodes.length; l < m; l++) {
            var node = elementpath.childNodes[l];
            child = xmlelement.parseChildrenRecursive(xmlelement, node);
            if (child !== null) {
              xmlelement.children.push(child);
            }
          }
        }

        return xmlelement;
      }