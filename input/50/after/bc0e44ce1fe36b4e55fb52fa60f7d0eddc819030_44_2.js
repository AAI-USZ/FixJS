function handleBack() {
    //If in an activity, cancel it
    var inActivity = ActivityHandler.currentlyHandling;
    if (inActivity && ActivityHandler.activityName == 'new') {
      ActivityHandler.postCancel();
    } else {
      navigation.back();
    }
  }