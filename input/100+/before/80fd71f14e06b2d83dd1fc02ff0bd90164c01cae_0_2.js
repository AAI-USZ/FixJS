function s2ab(text) {
	var arr = new Uint8Array(text.length);
	for (let a = text.length; a >= 0; a--) {
		arr[a] = text.charCodeAt(a);
	}
	return arr.buffer;
}