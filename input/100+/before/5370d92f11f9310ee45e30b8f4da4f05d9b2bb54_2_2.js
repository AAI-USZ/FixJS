function(){
        console.log("this is the initialize");
        var feeds = store.getRange(0, store.getCount());   
        for (var i = 0; i < feeds.length; i++) {   
            var feed = feeds[i];   
            console.log("feedId="+feed.getId());   
            Ext.YQL.request({
                query: feed.get('url'),
                callback: function(success, response) {
                    if (success && response.query && response.query.results) {    
                        feed.set('current',response.query.results);
                        feed.set('update','Y');
                        feed.save();
                        console.log(response.query.results);
                        console.log ("success:" + response.query);
                    }
                    else { 
                        feed.set('update','N');
                        feed.save();
                        console.log ("failed:" + response.query);
                    }
                },
            });
        }      
    }