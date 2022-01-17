function(success, response) {
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
                }