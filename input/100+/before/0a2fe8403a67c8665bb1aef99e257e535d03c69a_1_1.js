function(added) {
        if (_.isArray(added)) {
            _.each(added,
            function(track) {
                $('#playlist_next').append(OpenSpice.templates.trackInQueue({
                    name: track.name,
                    artists: _.pluck(track.artists, 'name').join(', ')
                }));
            });
        } else {
            $('#playlist_next').append(OpenSpice.templates.trackInQueue({
                name: added.name,
                artists: _.pluck(added.artists, 'name').join(', ')
            }));
        }
        $('.fnct_rm').click(OpenSpice.ask_rm_this).removeClass('fnct_rm');
    }