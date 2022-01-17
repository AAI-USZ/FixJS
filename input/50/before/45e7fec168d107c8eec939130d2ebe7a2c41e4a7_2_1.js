function (job, next) {
          job.should.not.have.property('_attributes.retry');
          next('first try is a fail');
        }