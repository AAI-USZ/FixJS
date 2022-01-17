function(elem) {
		for (var i = 0; i < elem.attributes.length; ++i) {
			var attrName = elem.attributes[i].nodeName;
			var attrValue = elem.attributes[i].nodeValue;
			var parser = new $.wiredui.TextElemParser(attrValue);

			var token = null;
			while( (token = parser.read()) !== null ) {
				switch(token.type) {
					case 'html':
						
						break;
					case 'output':
                        var nodeController = new $.wiredui.OutputNodeController(
                            this.varCtx
                            , this
                            , token.token
                        );
                        var childAttrCtrl = {
                            position: new $.wiredui.AttributePosition(elem, attrName),
                            nodeController: nodeController
                        };
                        this.attributeControllers.push(childAttrCtrl);
						break;
					case 'stmt':
					
						break;
				}
			}
		}
	}