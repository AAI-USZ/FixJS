function() {
            render({'connection': '/connections/' + esc(this.params['name'])}, 'connection',
                   '#/connections');
        }