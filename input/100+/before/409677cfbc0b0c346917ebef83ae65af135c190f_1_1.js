function(){

    	var root = new DOMParser().parseFromString("<xml/>",'text/xml').documentElement;

    	root.setAttribute('a','1');

    	console.assert(root.attributes[0].localName == 'a');

    	root.setAttribute('b',2);

    	root.setAttribute('a',1);

    	root.setAttribute('a',1);

    	root.setAttribute('a',1);

    	console.assert(root.attributes.length == 2);

    }