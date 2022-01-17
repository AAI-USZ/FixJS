function(){
            var parser = new Parser({strict:true}),
                called = true;
                
            parser.addListener("startkeyframes", function(event) {
                Assert.areEqual("webkit", event.prefix);
                Assert.areEqual("movingbox", event.name);
                Assert.areEqual(1, event.line, "Line should be 1");
                Assert.areEqual(1, event.col, "Column should be 1");
                called = true;
            });
            var result = parser.parse("@-webkit-keyframes movingbox{0%{left:90%;}}");
            Assert.isTrue(called);  //just don't want an error
        }