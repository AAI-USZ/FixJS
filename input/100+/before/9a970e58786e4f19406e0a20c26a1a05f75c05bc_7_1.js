function(){
            var parser = new Parser({strict:true});
            var result = parser.parse("@-webkit-keyframes movingbox{0%{left:90%;}}");
            Assert.isTrue(true);  //just don't want an error
        }