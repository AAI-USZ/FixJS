function (job, next) {
          job.should.have.property('_attributes.retry');
          job._attributes.retry.should.equal(1);
          process.nextTick(next);
        }