function getPostID(o)

{

	var o = o.getAttribute('id');

	if (!archive)

	{

		o = o.substr(1);

	}

	return parseInt(o);

}