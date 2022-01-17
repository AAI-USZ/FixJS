function(e){
    
                var obj = {};
    
                var arr = e.match(/(.*?)\[(.*?)](?: (.*))?/);
                obj.cda = arr[1];
                obj.dataAccessId = arr[2];
    
                var pathArray = obj.cda.split("/")
                var a = pathArray.slice(0,pathArray.length-1);
                obj.file = pathArray.slice(pathArray.length - 1)[0];
                obj.path = pathArray.slice(0,pathArray.length - 1).join("/")+"/";
            
            
                obj.pathDesc = (a.length>3?a.slice(0,2).concat([".."]).concat(a.slice(a.length-1,a.length)):a).join("/")+"/"
    
                var params = arr[3];
                if(params){
                    obj.params = _.map(params.substr(1,params.length-2).split(", "), function(param){
                        var a = param.split(": ");
                        return {
                            paramName: a[0], 
                            paramValue: a[1]
                        } ;
                    });
        
                }
            
                obj.paramLink = function(){
                    if(!obj.params){
                        return "";
                    }
                
                    var n = obj.params.length;
                    var template = " <a title='" + _.map(obj.params,function(p){
                        return p.paramName+": "+p.paramValue;
                    }).join("<br />") + "' class='params'>(" + n + " param" + (n>1?"s":"") +")</a>";
                
                    return template;
                };
            
                return obj;
    
            }