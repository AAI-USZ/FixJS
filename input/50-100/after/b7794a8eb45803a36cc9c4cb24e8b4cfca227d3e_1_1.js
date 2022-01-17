function(done)
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
		}