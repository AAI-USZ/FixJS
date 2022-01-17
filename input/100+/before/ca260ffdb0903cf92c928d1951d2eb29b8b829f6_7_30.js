function(e){return{x:(this.horizontal)?e.screenX:0,y:(this.vertical)?e.screenY:0};},scrollBy:function(x,y,test){var node=this.container.firstChild;var top=this.getTop();var left=this.getLeft();var dy=Math.floor(top+y);var dx=Math.floor(left+x);if(this.vertical&&(node.offsetHeight<=this.container.offsetHeight))
return;var max=0-node.offsetHeight+this.container.offsetHeight;var maxx=0-node.offsetWidth+this.container.offsetWidth;var ody=dy;var odx=dx;if(this.bump){if(dy>this.bump)
dy=this.bump;else if(dy<max-this.bump)
dy=max-this.bump;if(dx>this.bump)
dx=this.bump;else if(dy<maxx-this.bump)
dx=maxx-this.bump;}
if(!this.eventset)
this.eventset=joEvent.capture(node,this.transitionEnd,this.snapBack,this);if(top!=dx||left!=dy)
this.moveTo(dx,dy);}