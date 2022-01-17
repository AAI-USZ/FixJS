function() {
                var fs = require("fs"),
                    path = require("path"),
                    parserSrc = "javascript:" + fs.readFileSync( path.join(__dirname,
                        "rhino_modules", "jsdoc", "src", "parser.js") ),
                    parse = function() {
                        parser.parse(parserSrc);
                    };
                
                expect(parse).not.toThrow();
            }