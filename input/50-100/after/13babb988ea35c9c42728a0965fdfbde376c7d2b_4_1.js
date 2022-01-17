function(tx,ty,tz,scl,id,time){
  this.pos = V3.$(tx,ty,tz);
  this.scl = scl;
  this.id = id;
  this.time = Math.random()*100;
  this.speed = Math.random()+0.5;
  this.alive = 1;
}