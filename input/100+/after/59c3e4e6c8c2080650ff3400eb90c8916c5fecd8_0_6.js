function(){

  var w = this.original_width;
  var h = this.original_height;
  
  if(this.puzzle != undefined){
    w = this.puzzle.width;
    h = this.puzzle.height;
  }

  document.getElementById('canvas').width = window.innerWidth;
  document.getElementById('canvas').height = window.innerHeight;
  
  var rw = document.getElementById('canvas').width / w;
  var rh = document.getElementById('canvas').height / h;
  this.scale = Math.min(rw,rh);

  this.context.scale(this.scale,this.scale);
  console.log('scale: '+this.scale);  
  this.resized = false;
}