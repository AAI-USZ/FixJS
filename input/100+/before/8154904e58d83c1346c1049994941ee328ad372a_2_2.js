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
                }
            ]
        };

        it('/.handlers[.name == "message"].data.message.id', function() {
            expect(jpath(json, '/.handlers[.name == "messages"].data.message.id')).toEqual(["123"]);
        });

        it('/.handlers.name', function() {
            expect(jpath(json, '/.handlers.name')).toEqual(['messages', 'folders']);
        });

        it('/.handlers[0].data.message.*', function() {
            expect(jpath(json, '/.handlers[0].data.message.*')).toEqual(['123', '324']);
        });

    }