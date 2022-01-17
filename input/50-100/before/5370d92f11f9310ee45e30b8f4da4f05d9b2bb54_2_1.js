function(){
        var store=Ext.getStore('MyStore');
        var feeds = store.getRange(0, store.getCount());    
        for (var i = 0; i < feeds.length; i++) {               
            var feed = feeds[i];   
            console.log ("applycurrent="+feed.applyCurrent());
        }

    }