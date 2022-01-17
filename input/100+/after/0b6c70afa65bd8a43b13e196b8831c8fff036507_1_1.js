function(e){
            jstestdriver.console.error("indexedDB.delete Error: " + e);
            //prefer change id of database to start ont new instance
            dbObj.id = dbObj.id + "." + fallBackDBGuid;
            jstestdriver.console.log("fallback to new database name :" + dbObj.id)

        }