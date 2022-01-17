function(){
            var result = CSSLint.verify("@-webkit-keyframes spin {0%{ -webkit-transform: rotateX(-10deg) rotateY(0deg); } 100%{ -webkit-transform: rotateX(-10deg) rotateY(-360deg); } }", { "compatible-vendor-prefixes": 1 });
            Assert.areEqual(0, result.messages.length);
        }