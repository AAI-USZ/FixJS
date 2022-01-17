function loadCalendarEventInit(calendarItem, storageItem) {
        loadCalendarItemInit(calendarItem, storageItem);

        calendarItem.endDate = new TZDate(new Date(storageItem.endDate));
        calendarItem.availability = utils.copy(storageItem.availability);
        calendarItem.recurrenceRule = utils.copy(storageItem.recurrenceRule);
        calendarItem.expandRecurrence = function (startDate, endDate, successCallback, errorCallback) {
            calendarItem.startDate = startDate;
            calendarItem.endDate   = endDate;
        };
        calendarItem.frequency       = utils.copy(storageItem.frequency);
        calendarItem.interval        = utils.copy(storageItem.interval);
        calendarItem.untilDate       = new TZDate(new Date(storageItem.untilDate));
        calendarItem.occurrenceCount = utils.copy(storageItem.occurrenceCount);
        calendarItem.daysOfTheWeek   = utils.copy(storageItem.daysOfTheWeek);
        calendarItem.setPositions    = utils.copy(storageItem.setPositions);
        calendarItem.exceptions      = utils.copy(storageItem.exceptions);
    }