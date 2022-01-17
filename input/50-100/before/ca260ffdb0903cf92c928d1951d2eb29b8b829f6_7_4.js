function(){var get=this.baseurl+this.query;joFile(get,this.callBack,this);},callBack:function(data,error){if(error)
this.errorEvent.fire(error);else
this.setData(data);}});joFile=function(url,call,context,timeout){