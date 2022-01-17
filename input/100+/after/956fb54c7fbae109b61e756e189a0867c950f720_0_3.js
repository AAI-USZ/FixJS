function()
    {
        this.template = Templates.torrent_row

        this.model.on('change', this.render, this)

        this.model.on('all', console.log, console)

        this.model.on('destroy', function(){ debugger; console.warn('hey'); this.remove() }, this)

        this.model.live('properties', _.bind(function(properties) {
            properties.on('change', this.render, this)
            properties.on('all', console.log, console)
            properties.on('destroy', this.remove, this)
        }, this))

        this.bits = ['started', 'checking', 'start after check', 'checked', 'error', 'paused', 'queued', 'loaded']
    }