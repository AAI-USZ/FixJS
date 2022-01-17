function s2ab(text)

{

	var dicks = new ArrayBuffer(text.length);

	var docks = new Uint8Array(dicks);

	for (var a = 0; a < text.length; a++)

	{

		docks[a] = text.charCodeAt(a);

	}

	return dicks;

}