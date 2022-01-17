function meanings_check(){
  self.port.emit('meanings-swap', document.getElementById('adv_ducky').checked);
}