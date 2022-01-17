function filterLiveOnly(testDoc) {
  return !testDoc.hasOwnProperty('_deleted');
}