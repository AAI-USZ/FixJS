function() {
        var json = {
            handlers: [
                {
                    name: 'messages',
                    data: {
                        message: {
                            id: "123",
                            some: "324"
                        }
                    }
                },
                {
                    name: 'folders',
                    data: {
                        folder: []
                    }
                },
                {
                    name: 'settings',
                    data: {
                        prop1: 'on',
                        prop2: '',
                        prop3: 'on',
                        prop4: ''
                    }
                }
            ]
        };

        it('/.handlers[.name == "message"].data.message.id', function() {
            expect(jpath(json, '/.handlers[.name == "messages"].data.message.id')).toEqual(["123"]);
        });

        it('/.handlers.name', function() {
            expect(jpath(json, '/.handlers.name')).toEqual(['messages', 'folders', 'settings']);
        });

        it('/.handlers[0].data.message.*', function() {
            expect(jpath(json, '/.handlers[0].data.message.*')).toEqual(['123', '324']);
        });

        it('/.handlers[.name == "settings"].data.prop3[. == "on"]', function() {
            expect(jpath(json, '/.handlers[.name == "settings"].data.prop3[. == "on"]')).toEqual(['on']);
        });

        it('/.handlers[.name == "settings"].data.prop4[. == "on"]', function() {
            expect(jpath(json, '/.handlers[.name == "settings"].data.prop4[. == "on"]')).toEqual([]);
        });

        it('/.handlers[.name == "settings"].data.prop2[. != "on"]', function() {
            expect(jpath(json, '/.handlers[.name == "settings"].data.prop2[. != "on"]')).toEqual(['']);
        });

        it('/.handlers[.name == "settings"].data.prop3[. != "on"]', function() {
            expect(jpath(json, '/.handlers[.name == "settings"].data.prop3[. != "on"]')).toEqual([]);
        });
    }