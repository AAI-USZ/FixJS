function(value){this.min=0;this.max=1;this.snap=0;this.range=1;this.thumb=null;this.horizontal=1;this.vertical=0;this.moved=false;this.jump=true;joControl.call(this,null,value);}this.min=min||0;this.max=max||1;if(min<0&&max>=0)
this.range=Math.abs(min)+max;else if(min<0&&max<=0)
this.range=min-max;else
this.range=max-min;if(typeof snap!=='undefined')
this.snap=(snap>=0&&snap<=this.range)?snap:0;else
this.snap=0;this.setValue(this.value);return this;},setValue:function(value,silent){var v=this.adjustValue(value);if(v!=this.value){joControl.prototype.setValue.call(this,v);if(!silent)
