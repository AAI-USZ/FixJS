function(type, quality) {
	var elem = this[0];
	return (elem && elem.toDataURL) ?
		elem.toDataURL('image/' + type, quality) :
		NULL;
}