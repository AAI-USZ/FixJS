function(){var nextcall=this.queue.shift();if(!nextcall){this.timer=null;return;}
this.nextEvent.fire(nextcall);nextcall.call.call(nextcall.context,nextcall.data);if(this.queue.length)
this.timer=joEvent.yield(this.next,this,this.delay);else
this.timer=null;}};joClipboard={data:"",get:function(){return joPreference.get("joClipboardData")||this.data;},set:function(clip){this.data=clip;joPreference.set("joClipboardData");}};joDataSource=function(data){