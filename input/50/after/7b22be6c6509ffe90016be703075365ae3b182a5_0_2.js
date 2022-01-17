function (job, next) {
          spy1.should.have.been.called.once;
          process.nextTick(next);
        }