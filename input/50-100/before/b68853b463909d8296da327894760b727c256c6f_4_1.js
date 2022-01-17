function () {
            renderer.renderBootstrap(button, 'index', request, response);

            expect(bootstrap.compiledTemplate).toHaveBeenCalledWith({
                id: 'button',
                version: '2.0',
                viewId: 'index',
                placeholder: '{"html":"<div />"}',
                placeholderTimeout: 500,
                context: {
                    query: 'param=value',
                    body: '{}'
                }
            });
        }