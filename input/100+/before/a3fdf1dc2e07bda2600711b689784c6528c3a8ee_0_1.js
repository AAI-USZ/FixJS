function() {
            var test = this;
            YUI({
                useSync: true,
                filter: 'raw',
                groups: {
                    skins: {
                        base: resolvePath('./assets/'),
                        modules: {
                            'skin-test': {
                                skinnable: true
                            }
                        }
                    }
                },
                skin: {
                    overrides:{
                        'skin-test': ['green']
                    }
                }
            }).use('skin-test', function(Y, status) {
                console.log('Status', status);
                console.log(Object.keys(Y).sort());
            });
        }