function bucketExistsState(exists) {
      enableLookup(exists);
      enableDeleteBtn(exists);
      if (exists === false) {
        showPrevNextCont(exists);
      }
    }