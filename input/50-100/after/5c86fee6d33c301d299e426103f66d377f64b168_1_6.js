function () {
            expect(1);

            pklib.ajax.load({
                type: "GET",
                async: false,
                url: "http://localhost",
                timeout: 2000,
                params: {
                    id: 33
                },
                headers: {
                    "Platform": "tv"
                },
                done: function (response) {
                    notStrictEqual(response.length, 0, "Content length has no 0 size");
                    start();
                }
            });
        }