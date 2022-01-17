function giveHourMinute(time) {
  switch (time.constructor) {
    case String:
      time = parseInt(time);
      break;
    case Date:
      time = time.getTime();
      break;
  }

  return (new Date(time)).toLocaleFormat('%R %p');
}