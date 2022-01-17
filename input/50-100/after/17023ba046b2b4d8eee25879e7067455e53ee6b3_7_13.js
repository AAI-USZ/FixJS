function(i){xhr("GET",f[i].replace(/^[^\/]/,w.load.path+"$&"),function(str){res[i]=str
if(!--len){execScript(res.join(";"))
cb&&cb()
res=null}}).send()}