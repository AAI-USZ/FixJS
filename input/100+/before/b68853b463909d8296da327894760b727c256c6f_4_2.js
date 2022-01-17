function () {
            spyOn(renderer, 'sendComponent').andCallFake(function (transport, opt) {});

            var comp = {};
            comp.id = 'button';
            comp.version = '2.0';
            comp.view = 'index';
            comp.sid = 'comp1';
            comp.session = request.session;

            renderer.loadDataAndSend(comp, response);

            expect(dataLayer.loadData).toHaveBeenCalled();

            var callback = dataLayer.loadData.mostRecentCall.args[1];

            callback(null, {field: 'data'});

            expect(renderer.sendComponent).toHaveBeenCalledWith(response, {
                component: button,
                viewId: 'index',
                staticId: 'comp1',
                context: { field: 'data' },
                rain: {
                    css: [],
                    childrenInstanceIds: [],
                    transport: response,
                    session: request.session
                }
            });
        }