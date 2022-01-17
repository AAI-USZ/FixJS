function(options)
{
	var popover, title = options.title,
	content = options.content,
	actions = options.actions,
	inner = new Element('div.popover-inner')

	if (title)
	{
		inner.adopt(new Element('h3.popover-title', { 'html': title }))
	}

	if (typeOf(content) == 'element')
	{
		inner.adopt(new Element('div.popover-content').adopt(content))
	}
	else
	{
		inner.adopt(new Element('div.popover-content', { 'html': content }))
	}

	if (actions == 'boolean')
	{
		actions = [ new Element('button.cancel[data-action="cancel"]', { html: 'Cancel' })
		, new Element('button.primary[data-action="ok"]', { html: 'Ok' }) ]
	}

	if (actions)
	{
		inner.adopt(new Element('div.popover-actions').adopt(actions))
	}

	popover = new Element('div.popover').adopt([ new Element('div.arrow'), inner ])

	return (new Brickrouge.Popover(popover, options))
}