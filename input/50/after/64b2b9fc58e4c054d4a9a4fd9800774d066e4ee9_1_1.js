function setInputDisabled(state) {
  domainBlacklistEl.disabled = state;
  domainWhitelistEl.disabled = state;
  whitelistEl.disabled = state;
  for(var key in durationEls) {
    durationEls[key].disabled = state;
  }
}