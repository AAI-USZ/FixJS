function(event){
        window.plugins.nativeUI.setTitle({title: "Главная", organize: true, refresh: true, menu: true});

        lastPages = ["#postsPage"];

        initCounters();
        
        // try to hide splash if needed
        window.plugins.nativeUI.hideSplash();
    }