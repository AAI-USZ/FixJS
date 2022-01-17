function () {
            pklib.ajax.load({
                url: DIR + "data.xml",
                timeout: 2000,
                done: function (xml) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_xml", function () {
                        var child = xml.getElementsByTagName("child")[0],
                            content = child.text || child.textContent;
                        strictEqual(content, "data", msg("Data.xml"));
                        start();
                    });
                }
            });
        }