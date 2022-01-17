function() {
            var name = esc(this.params['name']);
            render({'connection': '/connections/' + name,
                    'channels': '/connections/' + name + '/channels'},
                'connection', '#/connections');
        }