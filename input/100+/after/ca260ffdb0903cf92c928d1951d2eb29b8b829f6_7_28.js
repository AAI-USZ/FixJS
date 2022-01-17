function(state){this.locked=(state)?1:0;return this;},pop:function(){if(this.data.length>this.locked){var o=this.data.pop();this.index=this.data.length-1;this.draw();if(typeof o.deactivate==="function")
o.deactivate.call(o);if(!this.data.length)
this.hide();}
if(this.data.length>0)
this.popEvent.fire();return this;}