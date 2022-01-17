function () {
            var entry = $build('entry', {xmlns: Strophe.NS.ATOM})
                .c('title').t('An atom').up()
                .c('geolocation').c('latitude').t('10.23').up().c('longitude').t('20.45').up().up()
                .c('published').t('1974-06-05T09:13:00Z').up()
                .c('count').t(3)
                .tree();
            expect(connection.PubSub._AtomToJson(entry)).toEqual({
                title: 'An atom',
                geolocation: {latitude: 10.23, longitude: 20.45},
                published: '1974-06-05T09:13:00Z',
                count: 3
            });
        }