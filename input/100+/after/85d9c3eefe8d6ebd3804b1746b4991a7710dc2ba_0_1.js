function(done){
            var spy = chai.spy();
            var r = new Rytm(function(){
                setTimeout(function(){
                    expect(spy).have.been.not_called;
                }, 20);

                setTimeout(function(){
                    expect(spy).have.been.called.once;
                    done();
                }, 120);
                this.go()
                expect(spy).have.been.not_called;
            });
            r
            .wait(100)
            .beat(spy)
            .go();
        }