function down(ev) {
  if (!itson) { return; }
  doit.className = 'measuring';
  if (time === 0) { 
    time = ev.timeStamp; 
    log.classList.add('animate');
  }
}