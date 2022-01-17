function(){
  return (this.hostname == location.hostname && !(/^mailto:/).test(this.href));
}