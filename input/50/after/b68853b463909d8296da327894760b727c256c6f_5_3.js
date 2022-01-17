function () {
            var message = translation.translate(
                    component, 'ro_RO', 'Dear %1$s %2$s,', undefined, undefined, ['Jhon', 'Doe']);
            expect(message).toEqual('Bună ziua domnule Doe,');
        }