function() {
            var path = '/exchanges/' + esc(this.params['vhost']) + '/' + esc(this.params['name']);
            render({'exchange': path,
                    'bindings_source': path + '/bindings/source',
                    'bindings_destination': path + '/bindings/destination'},
                'exchange', '#/exchanges');
        }