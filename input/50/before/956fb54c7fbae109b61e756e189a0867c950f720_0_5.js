function(torrent, torrent_list)
        {
            var view = new TorrentRow({
                model: torrent
             });

            this.$el.append(view.render().el)
        }