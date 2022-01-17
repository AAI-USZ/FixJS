function(){
        console.log("this is the initialize");
        var store=Ext.getStore('MyStore');
        var feeds = store.getRange(0, store.getCount());   
        for (var i = 0; i < feeds.length; i++) {   
            var feed = feeds[i];
            Ext.YQL.request({
                query: feed.get('url'),
                callback: function(success, response) {
                    //console.log("feedId="+feed.getId());                       
                    if (success && response.query && response.query.results) {    
                        console.log (response.query);
                        feed.set('current',response.query.results);
                        feed.applyCurrent();
                        feed.set('update','Y');
                        feed.save();
                        //console.log(response.query.results);
                        //console.log ("success:" + response.query);
                    }
                    else { 
                        feed.set('update','N');
                        feed.save();
                        //console.log ("failed:" + response.query);
                    }
                },
            });
        }      
    }