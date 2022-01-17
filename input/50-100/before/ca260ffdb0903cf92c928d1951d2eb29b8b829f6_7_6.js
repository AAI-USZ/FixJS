function(call,context){joDepotCall.push(handler);function handler(data){if(context)
call.call(context,data);else
call(data);};return"joDepotCall["+(joDepotCall.length-1)+"]";};joInterface=function(parent){jo.initTagMap();return this.get(parent);}