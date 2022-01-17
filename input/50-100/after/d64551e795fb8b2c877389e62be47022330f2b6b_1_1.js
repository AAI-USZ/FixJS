function() {
    popupPanel.port.emit('opened', 
                            [ss.storage.maximized, 
                             contentPrefService.get('keyword.URL') === DDG_URL,
                             ss.storage.ducky,
                             ss.storage.meanings]);
}