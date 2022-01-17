function(){

    	var root = new DOMParser().parseFromString("<xml xmlns:a='a' xmlns:b='b' xmlns='e'><child/></xml>",'text/xml').documentElement;

    	root.setAttributeNS('a','a:a','1');

    	console.assert(root.attributes.length == 4,root.attributes.length);

//not standart

//    	root.firstChild.setAttributeNode(root.attributes[0]);

//    	console.assert(root.attributes.length == 0);

    }