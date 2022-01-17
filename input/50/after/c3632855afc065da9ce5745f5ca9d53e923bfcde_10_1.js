function addClickListeners(searchContacts, displayList) {
    
    $j('#listpage #header #gear').off().enableTap().click(
        function(e) {
            e.preventDefault();
            SettingsManager.show();
        });
}