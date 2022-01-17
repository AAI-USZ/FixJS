function fin(){
    if (follow) {
      oraSock.removeListener('data', accept_oracle_data);
      oraSock.halfWayTime = Date.now();
    } else {
      DBInMgr.pushBackToFreelist(oraSock);
    }
  }