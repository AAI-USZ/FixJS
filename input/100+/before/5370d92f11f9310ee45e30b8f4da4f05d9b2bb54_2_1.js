function(success, response) {
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
                }