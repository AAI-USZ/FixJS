function (selectedBucket) {
      if (selectedBucket === undefined) {
        return;
      }
      bucketExistsState(!!selectedBucket);
    }