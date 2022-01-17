function sessionCallback() {
    
    $j('#loggedin').css('display', 'block');
    
    addClickListeners();

    var describeCallback, selectedContactId;    
    var ind = $j('#loggedin').showActivityInd('Loading...');
        
    var last_visit_loc = StorageManager.getLocalValue(last_visited_loc_storage_key);
    if (last_visit_loc && last_visit_loc.split('/').length == 2) {
        
        last_visit_loc = last_visit_loc.split('/');
        selectedContactId = last_visit_loc[0];
        
        describeCallback = function(success) { 
            if (success) {
                ind.hide();
                showContact(selectedContactId);
            }
        }
    }
    
    fetchContactDescribe(describeCallback);

    sobjectModel = {
        setRecords : function(recs) {
            this.records = recs;
            this.recordIds = [];
            for (i in recs) this.recordIds.push(recs[i].Id);
        }
    };
    
    splitView = new sforce.SplitView();
    listView = new sforce.ListView({selectedContactId: selectedContactId, onListSelect: getContacts, onSearch: searchContacts, onItemSelect: showContact});
    
    splitView.addOrientationChangeCallback(
        function() { listView.refreshScroller(); }
    );
    
    getContacts('recent', ind.hide);
    
    // Add the add to home screen scripts if needed
    if (typeof window.addToHomeLaunch == 'function') window.addToHomeLaunch();
}