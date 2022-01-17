function(){if(!this.db){this.errorEvent.fire();return;}
var self=this;if(arguments.length){var args=[];for(var i=0;i<arguments.length;i++)
args.push(arguments[i]);}
else{var args=this.args;}
var query=this.query;function success(t,result){self.data=[];for(var i=0,l=result.rows.length;i<l;i++){var row=result.rows.item(i);self.data.push(row);}
self.changeEvent.fire(self.data);}
function error(){joLog('SQL error',query,"argument count",args.length);self.errorEvent.fire();}
this.db.db.transaction(function(t){t.executeSql(query,args,success,error);});}};joFileSource=function(url,timeout){