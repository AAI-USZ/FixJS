function(url){
    console.log(url);
    if (tabs.activeTab.url == 'about:blank') {
        tabs.activeTab.url = url;
    } else {
        tabs.open({
            url: url 
        });    
    }
    popupPanel.hide();
}