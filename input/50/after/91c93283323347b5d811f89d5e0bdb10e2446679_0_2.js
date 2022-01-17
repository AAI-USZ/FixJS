function(){
        window.plugins.nativeUI.setTitle({title: "Лепрочятик", organize: false, refresh: false, menu: true});

        // set refresh interval
        refreshInterval = window.setInterval(requestNewChatData, 10000 );
    }