function addClickListeners() {
    
    $j('#listpage #footer #gear').off().enableTap().click(
        function(e) {
            e.preventDefault();
            splitView.focusOutContactList();
            setTimeout(SettingsManager.show, 10);
        });
    
    $j('#listpage #footer #home').off().enableTap().click(
        function(e) {
            e.preventDefault();
            splitView.focusOutContactList();
            showContactNews(null, true);
        });
}