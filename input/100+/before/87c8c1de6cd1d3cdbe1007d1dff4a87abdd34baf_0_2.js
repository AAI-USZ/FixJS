function(option, val, index) {
        var matches = option.match(val.value, 'i'),
            value = option,
            self = this

        if (matches && matches.length) {
            matches.each(function(substring) {
                val.value = substring
                value = option.replace(substring, self.options.highlightTemplate.substitute(val), 'ig')
            })
        }

        var opt = new Element(this.options.optionZen, {
            html: value
        }).inject(this.wrapper).store('index', index)

        index === this.index && opt.addClass(this.options.optionClassSelected)

        this.answersOptions.push(opt)

        if (this.options.maxHeight) { // if greater than 0 care about this
            this.wrapper.setStyle('height', 'auto')
            var height = this.wrapper.getSize().y

            if (height >= this.options.maxHeight) {
                this.wrapper.setStyle('height', this.options.maxHeight)
            }

        }
    }