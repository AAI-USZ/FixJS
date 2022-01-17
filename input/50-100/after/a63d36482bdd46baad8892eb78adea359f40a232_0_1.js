function(opts, tags, escape)
{
	var options = $.extend({
		'string' : opts,
		'tags' : tags,
		'escape' : escape
	}, opts);

	this.html(textpattern.gTxt(options.string, options.tags, options.escape));
	return this;
}