function() {
            var path = '/exchanges/' + esc(this.params['vhost']) + '/' + esc(this.params['name']);
            render({'exchange': path,
                    'bindings': path + '/bindings'}, 'exchange', '#/exchanges');
        }