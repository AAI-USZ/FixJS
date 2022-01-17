function(){this.queue=[];this.active=false;this.addEvent=new joSubject("add",this);this.startEvent=new joSubject("start",this);this.stopEvent=new joSubject("stop",this);this.nextEvent=new joSubject("next",this);this.stop();this.delay=100;}var context=this;if(!data)
var data="";this.queue.push({"call":call,"context":context,"data":data});if(this.active&&!this.timer)
this.next();},start:function(){this.active=true;this.startEvent.fire();this.next();},stop:function(){this.active=false;if(this.timer!=null)
