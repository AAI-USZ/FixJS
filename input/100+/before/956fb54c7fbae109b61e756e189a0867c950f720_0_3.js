function()
    {
        this.template = Templates.torrent_row

        // this.model.set({ selected: false }, { silent: true })
        this.model.on('change', this.render, this);

        this.model.live('properties', _.bind(function(properties) {
            properties.on('change', this.render, this);
        }, this));

        this.model.on('destroy', _.bind(function()
        {
            this.remove();
        }, this));

        this.bits = ['started', 'checking', 'start after check', 'checked', 'error', 'paused', 'queued', 'loaded'];
    }