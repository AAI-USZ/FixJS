function(){
    fs.unlink(logFile);
    if(!changesObservedThroughDefaultListener){
      assert.ok(changesObservedThroughDefaultListener,"this test should have triggered the default change handler numerous times");
    }
  }