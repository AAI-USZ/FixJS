function(call,observer,data){if(!call)
return false;var o={call:call,capture:true};if(observer)
o.observer=observer;if(data)
o.data=data;this.subscriptions.unshift(o);return this.subject;},release:function(call,observer){return this.unsubscribe(call,observer);}};var SEC=1000;var MIN=60*SEC;var HOUR=60*MIN;var DAY=24*HOUR;joTime={timestamp:function(){var now=new Date();return now/1;}};function joDefer(call,context,delay,data){