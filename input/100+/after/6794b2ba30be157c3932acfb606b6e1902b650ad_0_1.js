function connectProduct(product, plugin, hash) {
        var link = isInfoHash(hash) ? getMagnetLink(hash) : hash;

        console.log('connectProduct(' + product + ',' + hash + ')');
        var btapp = new Btapp();

        var status = new StatusView({model: btapp, product: product});
        $('.toolbox').append(status.render().el);

        var torrent_match = isInfoHash(hash) ? hash.toUpperCase() : '*';
        var queries = [
            'btapp/add/',
            'btapp/create/',
            'btapp/torrent/all/' + torrent_match + '/file/all/*/properties/all/streaming_url/',
            'btapp/torrent/all/' + torrent_match + '/file/all/*/properties/all/name/',
            'btapp/torrent/all/' + torrent_match + '/properties/all/name/',
            'btapp/torrent/all/' + torrent_match + '/properties/all/download_url/',
            'btapp/torrent/all/' + torrent_match + '/properties/all/uri/',
        ];

        btapp.connect({
            product: product,
            plugin: plugin,
            pairing_type: plugin ? 'iframe' : 'native',
            queries: queries
        });

        var file_callback = function(properties) {
            var name = properties.get('name');
            if(_.include(SUPPORTED_VIDEO_EXTENSIONS, name.substr(name.length - 3))) {
                var view = new VideoFileView({model: properties});
                $('body > .media.container .media').append(view.render().el);
            } else if(_.include(SUPPORTED_AUDIO_EXTENSIONS, name.substr(name.length - 3))) {
                var view = new AudioFileView({model: properties});
                $('body > .media.container .media').append(view.render().el);
            }
        } 


        btapp.live('torrent ' + torrent_match + ' properties', function(properties, torrent) {
            if(!properties || typeof properties !== 'object' || typeof properties.has === 'undefined') {
                return;
            }
            if( (isInfoHash(link) && torrent.id === hash) ||
                properties.get('download_url') === link ||
                properties.get('uri') === link
            ) {
                var view = new TorrentView({model: torrent});
                $('body > .media.container .media_header').append(view.render().el);

                torrent.live('file * properties', function(file_properties) {
                    file_callback(file_properties);
                });
            }
        });


        var add_callback = function(add) {
            btapp.off('add:add', add_callback);
            add.torrent(link);
        }
        btapp.on('add:add', add_callback);

        return btapp;
    }