function(call,observer){return this.unsubscribe(call,observer);}};var SEC=1000;var MIN=60*SEC;var HOUR=60*MIN;var DAY=24*HOUR;joTime={timestamp:function(){var now=new Date();return now/1;}};function joDefer(call,context,delay,data){if(!delay)
delay=100;if(!context)
context=this;var timer=window.setTimeout(function(){call.call(context,data);}