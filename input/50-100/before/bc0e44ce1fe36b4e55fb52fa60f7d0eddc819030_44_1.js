function callOrPick() {
    // FIXME: only handling 1 number
    var number = currentContact.tel[0].number;
    if (ActivityHandler.currentlyHandling) {
      ActivityHandler.pick(number);
    } else {
      try {
        var activity = new MozActivity({
          name: 'dial',
          data: {
            type: 'webtelephony/number',
            number: number
          }
        });
      } catch (e) {
        console.log('WebActivities unavailable? : ' + e);
      }
    }
  }