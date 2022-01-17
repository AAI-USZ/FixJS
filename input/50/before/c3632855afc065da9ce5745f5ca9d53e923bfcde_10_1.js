function addClickListeners(searchContacts, displayList) {
    
    $j('#listpage #header #gear').unbind().touch(
        function(e) {
            e.preventDefault();
            SettingsManager.show();
        });
}