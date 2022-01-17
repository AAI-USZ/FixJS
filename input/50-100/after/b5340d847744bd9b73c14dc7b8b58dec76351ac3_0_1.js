function()
    {
        Templates = {
            torrent_row: Handlebars.compile($('#tmpl_torrent').html())
        }

        btapp.connect({}, {
            poll_frequency: 1000,
            queries: Helpers.poll_queries,
            pairing_type: 'native',
            plugin: false
        })

        // this.torrents = new Torrents()
        this.torrents_contents = new TorrentsList({ model: new Backbone.Collection() })
        
        $('#torrents .content').replaceWith(this.torrents_contents.render().el)
    }