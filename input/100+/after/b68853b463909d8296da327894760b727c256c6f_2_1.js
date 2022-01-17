function () {
        componentOpt = {
            id: 'button',
            version: '1.0',
            viewId: 'index',
            context: 'my_data',
            session: {key: 'value'},
            request: {
                query: {page: 1},
                url: '/example/index',
                headers: {}
            },
            environment: {
                language: 'en_US'
            }
        };

        cb = jasmine.createSpy();
        fn = jasmine.createSpy().andCallFake(function (environment, callback, context, request) {
            callback(null, {oldData: context, newData: 'my_new_data'});
        });

        spyOn(global, 'requireWithContext').andCallFake(function () {
            return {
                index: fn
            };
        });

        var mocks = {
            './component_registry': jasmine.createSpyObj('component_registry', ['getConfig']),
            path: jasmine.createSpyObj('path', ['join']),
            fs: jasmine.createSpyObj('fs', ['exists'])
        };
        dataLayer = loadModuleExports('/lib/data_layer.js', mocks);

        mocks.fs.exists.andCallFake(function (path, callback) {
            callback(true);
        });
        mocks.path.join.andCallFake(path.join);
        mocks['./component_registry'].getConfig.andCallFake(function (id, version) {
            if (id === 'button' && version === '1.0') {
                return {
                    views: {
                        index: {}
                    },
                    folder: 'button'
                };
            }
        });
    }