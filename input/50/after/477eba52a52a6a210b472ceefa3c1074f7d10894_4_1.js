function (job, next) {
          spy2.should.have.not.been.called();
          next('first try is a fail');
        }