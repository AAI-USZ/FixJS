function() {
            var parser = new jsdoc.src.parser.Parser();

            it("should fire 'jsdocCommentFound' events when parsing source containing jsdoc comments", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = 'javascript:/** @name bar */';
                parser.on('jsdocCommentFound', spy).parse(sourceCode);
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0].comment).toEqual("/** @name bar */");
            });

            it("should fire 'symbolFound' events when parsing source containing named symbols", function() {
                var spy = jasmine.createSpy(),
                    sourceCode = 'javascript:var foo = 1';
                parser.on('symbolFound', spy).parse(sourceCode);
                expect(spy).toHaveBeenCalled();
            });
            
            it("should be able to parse its own source file", function() {
                var fs = require("fs"),
                    path = require("path"),
                    parserSrc = "javascript:" + fs.readFileSync( path.join(__dirname,
                        "rhino_modules", "jsdoc", "src", "parser.js") ),
                    parse = function() {
                        parser.parse(parserSrc);
                    };
                
                expect(parse).not.toThrow();
            });
        }