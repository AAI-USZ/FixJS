function(){
            var result = CSSLint.verify(".foo { width: available; padding: 10px; }", { "box-model": 1 });
            Assert.areEqual(0, result.messages.length);
        }