function re_groupCallsByContact() {
    var daySelector = '.log-group';
    var daysElements = document.querySelectorAll(daySelector);
    var daysElementsLength = daysElements.length;
    var itemSelector = '.log-item';
    var callLogItems, length, phoneNumber, recentCalls, recentCallsLastTime,
      recentMissedCalls, recentMissedCallsLastTime, logItemEntries,
      logItemEntry, contactEntry, entryTimes, missedEntryTimes;
    for (var dayElementsCounter = 0; dayElementsCounter < daysElementsLength;
      dayElementsCounter++) {
      callLogItems = daysElements[dayElementsCounter].
        querySelectorAll(itemSelector);
      length = callLogItems.length;
      recentCalls = new Object();
      recentCallsLastTime = new Object();
      recentMissedCalls = new Object();
      recentMissedCallsLastTime = new Object();
      for (var i = 0; i < length; i++) {
        phoneNumber = callLogItems[i].dataset.num;
        recentCalls[phoneNumber] = ((recentCalls[phoneNumber]) ?
          parseInt(recentCalls[phoneNumber]) : 0) + 1;
        if (!recentCallsLastTime[phoneNumber]) {
          recentCallsLastTime[phoneNumber] = callLogItems[i].
            querySelector('.secondary-info').textContent.trim();
        }
        if ((callLogItems[i].dataset.type == 'incoming') ||
          (callLogItems[i].dataset.type == 'incoming-refused')) {
          recentMissedCalls[phoneNumber] = ((recentMissedCalls[phoneNumber]) ?
            parseInt(recentMissedCalls[phoneNumber]) : 0) + 1;
          if (!recentMissedCallsLastTime[phoneNumber]) {
            recentMissedCallsLastTime[phoneNumber] = callLogItems[i].
              querySelector('.secondary-info').textContent.trim();
          }
        }
      }
      for (phoneNumber in recentCalls) {
        entryTimes = recentCalls[phoneNumber];
        if (entryTimes == 1) {
          continue;
        }
        itemSelector = '.log-item[data-num="' + phoneNumber + '"]';
        logItemEntries = daysElements[dayElementsCounter].
          querySelectorAll(itemSelector);
        logItemEntry = logItemEntries[0];
        contactEntry = logItemEntry.querySelector('.primary-info');
        contactEntry.textContent = contactEntry.textContent.trim() +
          ' (' + entryTimes + ')';
        logItemEntry.dataset.totalCalls = entryTimes;
        logItemEntry.dataset.lastCallTime = recentCallsLastTime[phoneNumber];
        missedEntryTimes = recentMissedCalls[phoneNumber];
        if (missedEntryTimes) {
          logItemEntry.dataset.missedCalls = missedEntryTimes;
          logItemEntry.dataset.lastMissedCallTime =
            recentMissedCallsLastTime[phoneNumber];
        }
        length = logItemEntries.length;
        for (i = 1; i < length; i++) {
          logItemEntries[i].classList.add('hide');
          logItemEntries[i].classList.add('collapsed');
        }
      }
    }
  }