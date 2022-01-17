function(done)
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
		}