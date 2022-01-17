function sessionCallback() {
    
    $j('#loggedin').css('display', 'block');
    
    addClickListeners();

    var describeCallback, selectedContactId;   
    var ind = $j('#loggedin').showActivityInd('Loading...');
    
    var callbacks = 0;
    var showMainFeed;
    
    var last_visit_loc = StorageManager.getLocalValue(last_visited_loc_storage_key);
    if (last_visit_loc && last_visit_loc.split('/').length == 2) {
        
        last_visit_loc = last_visit_loc.split('/');
        selectedContactId = last_visit_loc[0];
        
        var onSlide = function() {
            if (last_visit_loc[1] != 'info') renderContactInfo(last_visit_loc[0]);
            addLeftNavClickListeners([last_visit_loc[0]]);
            switchDetailSection(last_visit_loc[1] || 'info', [last_visit_loc[0]], ind.hide);
        }
        
        describeCallback = function(success) { 
            if (success) switchToDetail(onSlide);
        }
    } else {
        showMainFeed = function(success) {
            if (success) {
                callbacks += 1;
                if (callbacks == 2) {
                    showContactNews(ind.hide, false);
                }
            }
        }
        
        describeCallback = function(success) {
            //setupContactListSection();
            showMainFeed(success);
        };
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
    
    listView.displayList('recent', showMainFeed);
    
    // Add the add to home screen scripts if needed
    if (typeof window.addToHomeLaunch == 'function') window.addToHomeLaunch();
}