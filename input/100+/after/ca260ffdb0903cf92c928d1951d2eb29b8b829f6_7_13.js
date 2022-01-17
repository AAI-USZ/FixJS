function(){if(!this.db){this.errorEvent.fire();return this;}
var self=this;var args;if(arguments.length){args=[];for(var i=0;i<arguments.length;i++)
args.push(arguments[i]);}
else{args=this.args;}
var query=this.query;function success(t,result){self.data=[];for(var i=0,l=result.rows.length;i<l;i++){var row=result.rows.item(i);self.data.push(row);}
self.changeEvent.fire(self.data);}
function error(){joLog('SQL error',query,"argument count",args.length);self.errorEvent.fire();}
this.db.db.transaction(function(t){t.executeSql(query,args,success,error);});return this;}};joFileSource=function(url,timeout){