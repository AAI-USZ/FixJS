function(opts, tags, escape)
{
	var options = opts;

	if ($.type(options) !== 'object') {
		options = {
			string : opts,
			tags : tags,
			escape : escape
		};
	}

	$(this).html(textpattern.gTxt(options.string, options.tags, options.escape));
	return this;
}