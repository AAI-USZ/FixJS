function(el)
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
            }