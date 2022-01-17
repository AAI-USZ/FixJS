function(){

    	var root = new DOMParser().parseFromString("<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>",'text/xml').documentElement;

    	var child = root.firstChild

    	child.setAttributeNS('a','a:a','1');

    	child.setAttributeNS('b','b:b','2');

    	child.setAttributeNS('b','b:a','1');

    	console.assert(child.attributes.length == 3,child.attributes.length,child+'');

    	child.setAttribute('a',1);

    	child.setAttributeNS('b','b:b','2');

    	console.assert(child.attributes.length == 4,child.attributes.length);

    	try {

    		var c = root.ownerDocument.createElement('c');

    		c.setAttributeNodeNS(root.attributes.item(0));

    	} catch (e) {

    		console.assert(e.code == 10);

    		return;

    	}

    	console.assert(false);

    }