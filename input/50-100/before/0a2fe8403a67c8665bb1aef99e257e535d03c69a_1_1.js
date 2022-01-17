function(data) {
            _.each(data,
            function(t, i) {
                $('#playlist_next').append(OpenSpice.templates.trackInQueue({
                    name: t.name,
                    artists: _.pluck(t.artists, 'name').join(', ')
                }));
            });
        $('.fnct_rm').click(OpenSpice.ask_rm_this).removeClass('fnct_rm');
        }