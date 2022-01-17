function enqueue(mm) {
    LOG("enqueued " + mm);
    newMethods.setInsert(mm);
    updateLater();
  }