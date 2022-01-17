function loadCalendarTaskInit(calendarItem, storageItem) {
        loadCalendarItemInit(calendarItem, storageItem);

        calendarItem.endDate       = new TZDate(new Date(storageItem.endDate));
        calendarItem.completedDate = storageItem.completedDate?new TZDate(new Date(storageItem.completedDate)):storageItem.completedDate;
        calendarItem.progress      = utils.copy(storageItem.progress);
    }