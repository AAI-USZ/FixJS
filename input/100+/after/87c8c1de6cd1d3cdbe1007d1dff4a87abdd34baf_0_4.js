function(tags)
	{
        // called when blurred tags entry, rebuilds hash tags preview
        clearInterval(this.timer);

        var tagsArray = tags.split(',').map(function(el)
		{
            el = el.trim();
            return el;
        }).unique();

        var target = this.element.getFirst();

        if (tagsArray.length)
		{
            this.listTags.set('value', '');
            var orig = this.getTags() || [];
            tagsArray = orig.append(tagsArray).unique();

            /* remove tags that only differ in case */
            var tempArray = [];
            tagsArray.each(function(tag)
			{
                var found = tempArray.some(function(item)
				{
                    return item.toLowerCase() == tag.toLowerCase();
                });
                if (!found)
				{
                    tempArray.push(tag);
                }
            });
            tagsArray = tempArray;

            target.empty();
            var done = 0, added = [];
            Array.each(tagsArray, function(el)
			{
                this.options.caseSensitiveTagMatching || (el = el.toLowerCase());

                if (done >= this.options.maxItemCount)
				{
                    this.fireEvent('limitReached', el);
                    return;
                }

                if (el.length >= this.options.minItemLength && el.length < this.options.maxItemLength)
				{
                    new Element([this.options.tagEls, '[html=', el, '<span class="tagClose"></span>]'].join('')).inject(target);
                    done++;
                    added.push(el);
                }
                else
				{
                    this.fireEvent('invalidTag', el);
                }
            }, this);
            this.fireEvent('tagsUpdate', added);
        }
    }