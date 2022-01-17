function(){

    	var root = new DOMParser().parseFromString("<xml/>",'text/xml').documentElement;

    	root.setAttribute('a','1');

    	console.assert(root.attributes[0].localName == 'a');

    	root.setAttribute('b',2);

    	root.setAttribute('a',1);

    	root.setAttribute('a',1);

    	root.setAttribute('a',1);

    	console.assert(root.attributes.length == 2);

    	try {

    		var c = root.ownerDocument.createElement('c');

    		c.setAttributeNode(root.attributes.item(0));

    	} catch (e) {

    		console.assert(e.code == 10);

    		return;

    	}

    	console.assert(false);

    }