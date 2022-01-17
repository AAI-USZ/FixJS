function(i18n, atts, escape)
{
	var tags = atts || {};
	var string = i18n;
	var name = string.toLowerCase();

	if ($.type(textpattern.textarray[name]) !== 'undefined') {
		string = textpattern.textarray[name];
	}

	if (escape !== false) {
		string = $('<div/>').text(string).html();

		$.each(tags, function(key, value) {
			tags[key] = $('<div/>').text(value).html();
		});
	}

	$.each(tags, function(key, value) {
		string = string.replace(key, value);
	});

	return string;
}