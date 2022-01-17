function(){
  this.require = require;
  this.process = process;
  this.module = module;
  this.console.log('process', process);
  this.show();
  console.log("Window Ready");
}