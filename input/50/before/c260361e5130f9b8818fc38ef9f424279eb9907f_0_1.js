function(){
           var oo = JSUS.tokenize(str, separators);
           oo.length.should.be.eql(6);
           console.log(oo)
        }