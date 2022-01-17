function()
	{
		it('#watch watches a tube', function(done)
		{
			consumer.connect(function(err)
			{
				consumer.watch(tube, function(err, response)
				{
					should.not.exist(err);
					response.should.equal('2');
					done();
				});
			});
		});
		it('#ignore ignores a tube', function(done)
		{
			consumer.ignore('default', function(err, response)
			{
				should.not.exist(err);
				response.should.equal('1');
				done();
			});
		});
		it('#list_tubes_watched returns the tubes the consumer watches', function(done)
		{
			consumer.list_tubes_watched(function(err, response)
			{
				should.not.exist(err);
				response.length.should.equal(1);
				response.indexOf(tube).should.equal(0);
				done();
			});
		});
		it('#peek_ready peeks ahead at jobs', function(done)
		{
			this.timeout(4000);
			producer.peek_ready(function(err, jobid, payload)
			{
				should.not.exist(err);
				jobid.should.exist;
				testjobid = jobid;
				var parsed = JSON.parse(payload);
				parsed.should.have.property('type');
				parsed.type.should.equal('test');
				done();
			});
		});
		it('#stats_job returns job stats', function(done)
		{
			consumer.stats_job(testjobid, function(err, response)
			{
				response.should.be.a('object');
				response.should.have.property('id');
				response.id.should.equal(parseInt(testjobid));
				response.tube.should.equal(tube);
				done();
			});
		});
		it('#reserve returns a job', function(done)
		{
			consumer.reserve(function(err, jobid, payload)
			{
				should.not.exist(err);
				jobid.should.equal(testjobid);
				var parsed = JSON.parse(payload);
				parsed.should.have.property('type');
				parsed.type.should.equal('test');
				done();
			});
		});
		it('#touch informs the server the client is still working', function(done)
		{
			consumer.touch(testjobid, function(err)
			{
				should.not.exist(err);
				done();
			});
		});
		it('#release releases a job', function(done)
		{
			consumer.release(testjobid, 1, 1, function(err)
			{
				should.not.exist(err);
				done();
			});
		});

		it('jobs can contain binary data', function(done)
		{
			var payload = readTestImage();
			var ptr = 0;
			producer.put(0, 0, 60, payload, function(err, jobid)
			{
				should.not.exist(err);
				jobid.should.exist;

				consumer.reserve(function(err, returnID, returnPayload)
				{
					should.not.exist(err);
					returnID.should.equal(jobid);

					// we should get back exactly the same bytes we put in
					returnPayload.length.should.equal(payload.length);
					while (ptr < returnPayload.length)
					{
						returnPayload[ptr].should.equal(payload[ptr]);
						ptr++;
					}

					consumer.destroy(returnID, function(err)
					{
						should.not.exist(err);
						done();
					});
				});
			});
		});

		it('#peek_delayed returns data for a delayed job', function(done)
		{
			producer.peek_delayed(function(err, jobid, payload)
			{
				should.not.exist(err);
				jobid.should.equal(testjobid);
				done();
			});
		});
		it('#bury buries a job (> 1sec expected)', function(done)
		{
			// this takes a second because of the minumum delay enforced by release() above
			this.timeout(3000);
			consumer.reserve(function(err, jobid, payload)
			{
				consumer.bury(jobid, fivebeans.LOWEST_PRIORITY, function(err)
				{
					should.not.exist(err);
					done();
				});
			});
		});
		it('#peek_buried returns data for a buried job', function(done)
		{
			producer.peek_buried(function(err, jobid, payload)
			{
				should.not.exist(err);
				jobid.should.equal(testjobid);
				done();
			});
		});
		it('#kick un-buries jobs in the producer\'s used queue', function(done)
		{
			producer.kick(10, function(err, count)
			{
				should.not.exist(err);
				count.should.equal('1');
				done();
			});
		});
		it('#pause_tube suspends new job reservations (> 1sec expected)', function(done)
		{
			consumer.pause_tube(tube, 3, function(err)
			{
				should.not.exist(err);
				consumer.reserve_with_timeout(1, function(err, jobid, payload)
				{
					err.should.equal('TIMED_OUT');
					done();
				});
			});
		});
		it('#destroy deletes a job (nearly 2 sec expected)', function(done)
		{
			// this takes a couple of seconds because of the minumum delay enforced by pause_tube() above
			this.timeout(5000);
			consumer.reserve(function(err, jobid, payload)
			{
				consumer.destroy(jobid, function(err)
				{
					should.not.exist(err);
					done();
				});
			});
		});
		it('#reserve_with_timeout times out when no jobs are waiting (> 1sec expected)', function(done)
		{
			this.timeout(3000);
			consumer.reserve_with_timeout(1, function(err, jobid, payload)
			{
				err.should.equal('TIMED_OUT');
				done();
			});
		});
	}