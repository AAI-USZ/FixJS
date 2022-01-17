function() {
      var err = new AmazonError({statusCode: 500, type: "com.amazonaws.dynamodb.v20111205#InternalFailureException"});

      err.retry.should.be.true;
    }