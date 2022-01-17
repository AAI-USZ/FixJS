function(date) {
  var dateIso = [
      date.getFullYear(),
      common.zeroPad(date.getMonth() + 1),
      common.zeroPad(date.getDate())].join('');

  // If the time is exactly midnight, this might be an all-day event.
  if (date.getHours() !== 0 || date.getMinutes() !== 0) {
    dateIso += [
        'T',
        common.zeroPad(date.getHours()),
        common.zeroPad(date.getMinutes()),
        '00'].join('');
  }

  return dateIso;
}