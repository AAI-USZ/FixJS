function (done) {
    var data = { hello: 'universe' }
      , spy1 = chai.spy(function (job, next) {
          job.should.not.have.property('_attributes.retry');
          next('first try is a fail');
        })
      , spy2 = chai.spy(function (job, next) {
          job.should.have.property('_attributes.retry');
          job._attributes.retry.should.equal(1);
          process.nextTick(next);
        })
      , tries = [spy1, spy2]
      , spy = chai.spy(function (job, next) {
          job.should.be.an('object');
          job.should.have.property('id');
          job.should.have.property('data')
            .and.deep.equal(data);
          tries.length.should.be.gt(0);
          tries.shift()(job, next);
        });

    queue
      .define('task retry')
      .tag('task rery')
      .retry('10ms', 1)
      .on('complete', function (job) {
        job.get('task').should.equal('task retry');
        job.get('data').should.deep.equal(data);
        job.get('status').should.equal('completed');
        spy.should.have.been.called.twice;
        spy1.should.have.been.called.once;
        spy2.should.have.been.called.once;
        done();
      })
      .action(spy);

    queue.create('task retry', data);
    queue.process([ 'task retry' ]);
  }