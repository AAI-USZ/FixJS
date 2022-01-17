function(e) {
        var tag = e.target.getParent(),
            tagText = tag.get('text')

        this.options.caseSensitiveTagMatching || (tagText = tagText.toLowerCase())

        tag.destroy()
        this.fireEvent('tagRemove', tagText)
        clearTimeout(this.timer)
        this.options.persist && this.listTags.focus.delay(10, this.listTags)
    }