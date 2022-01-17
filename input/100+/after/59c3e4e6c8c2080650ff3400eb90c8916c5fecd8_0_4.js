function() {
  if(!this.scale) this.scale = 1;
  this.context.fillStyle = "rgba(125, 125, 125, 1)";
  this.context.fillRect(0,0,this.canvas.width/this.scale,this.canvas.height/this.scale);

  if(this.placed_pieces){
    this.context.save();
    grad = this.context.createRadialGradient(this.canvas.width/this.scale/2, this.canvas.height/this.scale/2, 0, this.canvas.width/this.scale/2, this.canvas.height/this.scale/2, this.canvas.width/this.scale);
    if(this.puzzle.num_pieces > this.placed_pieces.length){
      grad.addColorStop(1, ['rgb(', 256, ', ', 256, ', ', 256, ')'].join(''));
      grad.addColorStop(0, ['rgb(', 100, ', ', 100, ', ', 100, ')'].join(''));
    }else{
      grad.addColorStop(0, ['rgb(', 256, ', ', 256, ', ', 256, ')'].join(''));
      grad.addColorStop(1, ['rgb(', 100, ', ', 100, ', ', 100, ')'].join(''));
    }
    this.context.fillStyle = grad;
    this.context.fillRect(0,0,this.canvas.width/this.scale, this.canvas.height/this.scale);
    this.context.restore();
  }
  
  /*
  var width = this.canvas.width, 
    height = this.canvas.height, 
    x = this.canvas.width, 
    y = this.canvas.height,
    rx =this.canvas.width/2,
    ry = this.canvas.height/2;
  if(this.mouse != undefined){
    rx = this.mouse.x;
    ry = this.mouse.y;
  }
  var xc = ~~(256 * rx / width);
  var yc = ~~(256 * ry / height);
  
  this.context.save();
  grad = this.context.createRadialGradient(rx, ry, 0, rx, ry, this.canvas.width); 
  grad.addColorStop(0, '#000');
  grad.addColorStop(1, ['rgb(', 256, ', ', 0, ', ', 0, ')'].join(''));
  this.context.fillStyle = grad;
  this.context.fillRect(0,0,x,y);
  this.context.restore();
  */

  /*
  //puzzle image
  var offsetx = Math.round(this.scaled_width-(this.img_width)/2);
  var offsety = Math.round(this.scaled_height-(this.img_height)/2);
  offsety += 40;
  this.context.globalAlpha = 0.2;
  this.context.drawImage(this.img, offsetx, offsety, this.img_width, this.img_height);
  */
}