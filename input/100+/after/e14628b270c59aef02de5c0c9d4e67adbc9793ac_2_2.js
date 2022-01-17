function(){
            var result = CSSLint.verify("h1 { box-shadow: 5px 5px 5px #ccc; }", { "compatible-vendor-prefixes": 1 });
            Assert.areEqual(0, result.messages.length);
        }