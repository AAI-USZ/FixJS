function fin(){
    if (follow) {
      oraSock.removeListener('data', accept_oracle_data);
      oraSock.halfWayTime = new Date();
    } else {
      DBInMgr.pushBackToFreelist(oraSock);
    }
  }