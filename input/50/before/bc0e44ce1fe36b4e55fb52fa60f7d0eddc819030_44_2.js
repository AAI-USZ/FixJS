function handleBack() {
    //If in an activity, cancel it
    if (ActivityHandler.currentlyHandling) {
      ActivityHandler.cancel();
    } else {
      navigation.back();
    }
  }