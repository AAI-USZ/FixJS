function() {
            var result = CSSLint.verify("h1 { -webkit-transition: height 20px 1s; -moz-transition: height 20px 1s; }", { "compatible-vendor-prefixes": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("The property -o-transition is compatible with -webkit-transition and -moz-transition and should be included as well.", result.messages[0].message);
            Assert.areEqual(6, result.messages[0].col);
            Assert.areEqual(1, result.messages[0].line);            
        }