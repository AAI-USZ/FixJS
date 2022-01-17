function() {
            expect(jpath(json, '/.handlers.name')).toEqual(['messages', 'folders', 'settings']);
        }