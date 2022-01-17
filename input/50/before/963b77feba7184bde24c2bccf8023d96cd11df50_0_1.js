function sendSms() {
    SmsIntegration.sendSms(currentContact.tel[0].number)
  }