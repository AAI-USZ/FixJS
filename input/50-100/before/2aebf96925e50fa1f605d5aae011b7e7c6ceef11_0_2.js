function up(ev) {
  doit.className = '';
  if (!itson) { return; }
  if (time !== 0) {
    displayresult(ev.timeStamp - time);
    time = 0;
    log.classList.remove('animate');
  }
}