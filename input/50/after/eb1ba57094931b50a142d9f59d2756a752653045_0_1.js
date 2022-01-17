function() {
    if(!helpers.isItWeekend()) {
      helpers.sendMails()
    }

    scheduleMail(helpers.getTomorrowMorning())
  }