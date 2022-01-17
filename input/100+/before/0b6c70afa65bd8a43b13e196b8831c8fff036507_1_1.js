function deleteDB(dbObj) {
    try {

        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

        var dbreq = indexedDB.deleteDatabase(dbObj.id);
        dbreq.onsuccess = function (event) {
            var db = event.result;
            jstestdriver.console.log("indexedDB: " + dbObj.id + " deleted");
        }
        dbreq.onerror = function (event) {
            jstestdriver.console.error("indexedDB.delete Error: " + event.message);
        }
    }
    catch (e) {
        jstestdriver.console.error("Error: " + e.message);
        //prefer change id of database to start ont new instance
        dbObj.id = dbObj.id + "." + fallBackDBGuid;
        jstestdriver.console.log("fallback to new database name :" + dbObj.id)
    }
}