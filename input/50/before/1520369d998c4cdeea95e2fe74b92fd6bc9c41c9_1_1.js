function() {
    ember_assert("Reopening already instantiated classes is not supported. We plan to support this in the future.", isPrepared === false);
    isPrepared = false;
  }