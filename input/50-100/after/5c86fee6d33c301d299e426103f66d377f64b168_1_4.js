function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.xml",
                timeout: 2000,
                done: function (xml) {
                    var child = xml.getElementsByTagName("child")[0],
                        content = child.text || child.textContent;
                    strictEqual(content, "data", msg("Data.xml"));
                    start();
                }
            });
        }