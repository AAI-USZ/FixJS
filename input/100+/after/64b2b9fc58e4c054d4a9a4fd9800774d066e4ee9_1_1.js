function () {
  console.log("form submitted");
  var durations = {}, duration, durationStr, durationMatch;
  
  for(var key in durationEls) {
    durationStr = durationEls[key].value;
    durationMatch = durationStr.match(TIME_REGEX);
    if(durationMatch) {
      console.log(durationMatch);
      durations[key] = (60 * parseInt(durationMatch[1], 10));
      if(durationMatch[3]) {
        durations[key] += parseInt(durationMatch[3], 10);
      }
    } else {
      timeFormatErrorEl.className = 'show';
      return false;
    } 
  }
  
  console.log(durations);
  
  background.setPrefs({
    domainWhitelist:    domainWhitelistEl.value.split(/\r?\n/),
    domainBlacklist:    domainBlacklistEl.value.split(/\r?\n/),
    durations:          durations,
    showNotifications:  showNotificationsEl.checked,
    shouldRing:         shouldRingEl.checked,
    clickRestarts:      clickRestartsEl.checked,
    whitelist:          whitelistEl.selectedIndex == 1
  })
  saveSuccessfulEl.className = 'show';
  return false;
}