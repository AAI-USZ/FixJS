function s2ab(text)

{

	var foo = new ArrayBuffer(text.length);

	var bar = new Uint8Array(foo);

	for (var a = 0; a < text.length; a++)

	{

		bar[a] = text.charCodeAt(a);

	}

	return foo;

}