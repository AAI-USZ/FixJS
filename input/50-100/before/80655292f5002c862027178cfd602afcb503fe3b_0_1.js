function getElementsByClass(node, searchClass) {

	var ret = new Array();

	var els = node.getElementsByTagName('*');

	for (var i = 0; i < els.length; ++i) {

		if (els[i].className == searchClass)

			ret.push(els[i]);

	}

	return ret;

}