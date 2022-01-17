function change_default(){
  self.port.emit('swap-default', document.getElementById('default_search').checked);
}