function handler(data,error){if(call){if(context)
call.call(context,data,error);else
call(error,data,error);}}