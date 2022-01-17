function(data) {
            _.each(data,
            function(t, i) {
                $('#mainmenu').append(OpenSpice.templates.trackInQueue({
                    name: t.name,
                    artists: _.pluck(t.artists, 'name').join(', ')
                }));
            });
        }