function TEST_adjustSyncValues(syncValues) {
  INITIAL_SYNC_DAYS = syncValues.days;

  SYNC_REFRESH_USABLE_DATA_TIME_THRESH_NON_INBOX =
    syncValues.refreshNonInbox;
  SYNC_REFRESH_USABLE_DATA_TIME_THRESH_INBOX =
    syncValues.refreshInbox;
  SYNC_REFRESH_USABLE_DATA_OLD_IS_SAFE_THRESH =
    syncValues.oldIsSafeForRefresh;
  SYNC_REFRESH_USABLE_DATA_TIME_THRESH_OLD =
    syncValues.refreshOld;

  SYNC_USE_KNOWN_DATE_RANGE_TIME_THRESH_NON_INBOX =
    syncValues.useRangeNonInbox;
  SYNC_USE_KNOWN_DATE_RANGE_TIME_THRESH_INBOX =
    syncValues.useRangeInbox;
}