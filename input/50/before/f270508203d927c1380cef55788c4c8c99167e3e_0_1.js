function(msg) {
  this.content.textContent += msg.content + '\n';
  alert('Received message ' + msg.type + ': ' + msg.content);
}