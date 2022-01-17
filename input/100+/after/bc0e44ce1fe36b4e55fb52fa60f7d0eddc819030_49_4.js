function re_groupCallsByContactDayType() {
    var daySelector = '.log-group';
    var daysElements = document.querySelectorAll(daySelector);
    var daysElementsLength = daysElements.length;
    var itemSelector = '.log-item';
    var callLogItems, length, phoneNumber, callType, callCount, callDate,
      sameTypeCallSelector, sameTypeCall, sameTypeCallSelectorAux,
      sameTypeCallAux,
      sameTypeCallCount;
    for (var dayElementsCounter = 0; dayElementsCounter < daysElementsLength;
      dayElementsCounter++) {
      callLogItems = daysElements[dayElementsCounter].
        querySelectorAll(itemSelector);
      length = callLogItems.length;
      for (var i = 0; i < length; i++) {
        phoneNumber = callLogItems[i].dataset.num.trim();
        callType = callLogItems[i].dataset.type;
        callCount = (callLogItems[i].dataset.count ?
          parseInt(callLogItems[i].dataset.count) : 1);
        callDate = callLogItems[i].dataset.date;
        if (callType.indexOf('dialing') != -1) {
          sameTypeCallSelector = '[data-num^="' + phoneNumber +
            '"][data-type="dialing-refused"][data-count]:not(.hide)';
          sameTypeCall = daysElements[dayElementsCounter].
            querySelector(sameTypeCallSelector);
        } else if (callType.indexOf('incoming-connected') != -1) {
          sameTypeCallSelector = '[data-num^="' + phoneNumber +
            '"][data-type="incoming-connected"][data-count]:not(.hide)';
          sameTypeCall = daysElements[dayElementsCounter].
            querySelector(sameTypeCallSelector);
        } else {
          sameTypeCallSelector = '[data-num^="' + phoneNumber +
            '"][data-type="incoming"][data-count]:not(.hide)';
          sameTypeCall = daysElements[dayElementsCounter].
            querySelector(sameTypeCallSelector);
          sameTypeCallSelectorAux = '[data-num^="' + phoneNumber +
            '"][data-type="incoming-refused"][data-count]:not(.hide)';
          sameTypeCallAux = daysElements[dayElementsCounter].
            querySelector(sameTypeCallSelectorAux);
          if (sameTypeCallAux) {
            if (sameTypeCall) {
              if (sameTypeCall.dataset.date < sameTypeCallAux.dataset.date) {
                sameTypeCall = sameTypeCallAux;
              }
            } else {
              sameTypeCall = sameTypeCallAux;
            }
          }
        }
        callLogItems[i].dataset.count = callCount;
        if (sameTypeCall) {
          sameTypeCallCount = parseInt(sameTypeCall.dataset.count);
          if (sameTypeCall.dataset.date > callDate) {
            this.groupCalls(callLogItems[i], sameTypeCall,
              sameTypeCallCount, 1);
          } else {
            this.groupCalls(sameTypeCall, callLogItems[i],
              callCount, sameTypeCallCount);
          }
        }
      }
    }
  }