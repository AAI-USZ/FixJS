function()
    {
        var settings = {
            style: this.getSelect('r_style'),
            size: this.getSelect('r_size'),
            margin: this.getSelect('r_margin'),
            enable_links: $('#enable_links').attr('checked'),
            enable_experimental: $('#enable_experimental').attr('checked'),
            show_article_tools: $('#show_article_tools').attr('checked'),
            enable_keys: $('#enable_keys').attr('checked'),
            keys: keybox.keys
        };

        //console.log(settings);
        
        chrome.extension.sendRequest(
            {'type': 'setSettings', 'settings': settings},
            _.bind(this.markClean, this));
    }