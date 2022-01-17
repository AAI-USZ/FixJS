function(){
    fs.unlink(logFile);
    if(!changesObservedThroughDefaultListener){
      ("this test should have triggered the default change handler numerous times").should.eql(true);
    }
  }