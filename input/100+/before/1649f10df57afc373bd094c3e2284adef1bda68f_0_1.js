function(done)
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
		}