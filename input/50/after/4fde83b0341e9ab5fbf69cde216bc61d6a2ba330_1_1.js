function() {
      var err = new AmazonError({statusCode: 400, type: "com.amazonaws.dynamodb.v20111205#Throttling"});

      err.retry.should.be.true;
    }