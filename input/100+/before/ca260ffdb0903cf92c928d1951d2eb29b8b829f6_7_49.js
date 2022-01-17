function(e){joEvent.stop(e);this.reset();var node=this.container.firstChild;this.inMotion=true;this.moved=false;if(!this.mousemove){this.mousemove=joEvent.on(document.body,"mousemove",this.onMove,this);this.mouseup=joEvent.capture(document.body,"mouseup",this.onUp,this);}},reset:function(){this.moved=false;this.inMotion=false;this.firstX=-1;this.firstY=-1;},onMove:function(e){if(!this.inMotion)
return;joEvent.stop(e);e.preventDefault();var point=this.getMouse(e);var y=point.y;var x=point.x;if(this.firstX==-1){this.firstX=x;this.firstY=y;this.ox=this.thumb.offsetLeft;this.oy=this.thumb.offsetTop;}
var x=(x-this.firstX)+this.ox;var y=(y-this.firstY)+this.oy;if(x>4||y>4)
this.moved=true;var t=this.thumb.offsetWidth;var w=this.container.offsetWidth-t;if(x<0)
x=0;else if(x>w)
x=w;if(!this.snap)
this.moveTo(x);this.setValue((x/w)*this.range+this.min,!this.snap);},moveTo:function(x){this.thumb.style.left=x+"px";},initValue:function(value){var t=this.container.firstChild.offsetWidth;var w=this.container.offsetWidth-t;var x=Math.floor((this.value/this.range)*w);this.moveTo(x);return this;}