function() {
    if(!isItWeekend) {
      helpers.sendMails()
    }

    scheduleMail(helpers.getTomorrowMorning())
  }