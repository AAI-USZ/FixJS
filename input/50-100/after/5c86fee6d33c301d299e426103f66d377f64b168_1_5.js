function (xml) {
                    var child = xml.getElementsByTagName("child")[0],
                        content = child.text || child.textContent;
                    strictEqual(content, "data", msg("Data.xml"));
                    start();
                }