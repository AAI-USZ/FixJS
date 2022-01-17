function(out,pathParams,requestParams){
    
    try {
        
        persistenceEngine.initializeClass("Alert");
        
        var params = new Packages.java.util.HashMap();
        var alertType = requestParams.getStringArrayParameter("alertType",null);
        
        var viewHistory = false;
        var cdvGroup = requestParams.getStringParameter("cdvGroup",null);
        var cdvName = requestParams.getStringParameter("cdvName",null);
        
        
        var isEmpty = function(s){
            return (s == null || s == "");
            
        }
        
        if( !isEmpty(cdvGroup) && !isEmpty(cdvName) ){
            viewHistory = true;
        }

        console.log("cdvGroup: " + (cdvName==null) + "; ViewHistory: " + viewHistory);
        
        // params.put("alertType", alertType);
        params.put("cdvGroup", cdvGroup);
        params.put("cdvName", cdvName);
        
        console.log("Starting getAlerts: " +  new Date() + "; " + alertType + "; >" + (viewHistory?("View History: " + cdvGroup + ':' + cdvName):"<"));
        
        var results;
        
        console.log("Alert filters: DISABLED FOR NOW UNTIL WE MAKE THIS WORK ");
        
        var where = "";
        if(viewHistory){
            // where = " and group = \""+cdvGroup+"\" and name = \""+cdvName+"\" ";
            console.log("Setting where");
            where = " and group = :cdvGroup and name = :cdvName ";
            
        }
        
        // TODO - Get this into prepared statements. Currently, seems orient doesn't properly support them
        if (alertType != null){
            var alertTypes = [], i = 0;
            for( i = 0; i < alertType.length; i++ ){
                var s = '"'+alertType[i] + '"';
                alertTypes.push(s);
                console.log("AlertType " + i + ": " + s);
            }
            
            if(alertTypes.length > 0){
                where += " and level in [ " + alertTypes.join(" , ") + "]";
            }
                
        }
        
        if(alertType && false){ 
            results = persistenceEngine.query("select timestamp, "+
                " group, name, message, userid, level, @rid as rid from Alert where level in [ :alertType ] " + where + " order by rid desc limit 100", params );
            
        }
        else{
            results = persistenceEngine.query("select timestamp, "+
                " group, name, message, userid, level, @rid as rid from Alert where 1 = 1 " + where + " order by rid desc limit 100",params);
            
        }
        
        
        //console.log("Results: " + results.toJSON());
        
        var object = JSON.parse(results.toString());
        console.log("Finished parsing: " +  new Date());
                
        _.map(object,function(l){
            
            // Add timestamp group
            l.timestampGroup = wd.cdv.utils.groupTimestamp(l.timestamp,2);
            return l;
  
        });

        console.log("Finishing getAlerts: " +  new Date());
        out.write(new java.lang.String(JSON.stringify(object,null,2)).getBytes("utf-8"));
        
        
    } catch (e) {
        print(e);
    }
}