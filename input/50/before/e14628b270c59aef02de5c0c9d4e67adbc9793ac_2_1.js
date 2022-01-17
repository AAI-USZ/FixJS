function(){
            var result = CSSLint.verify(".next:focus { -moz-animation: 'diagonal-slide' 5s 10; -webkit-animation: 'diagonal-slide' 5s 10; -ms-animation: 'diagonal-slide' 5s 10; }", { "compatible-vendor-prefixes": 0 });
            Assert.areEqual(0, result.messages.length);
        }