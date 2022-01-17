function () {
            expect(translation.translate(component, 'en_US', 'No translation'))
            .toEqual('No translation');
        }