function(req,res)
    {
        
        twitter.get('search', { q: 'cybersecurity', since: '2011-11-11' }, function(err, reply) {
            console.log("Errors:",err);
            console.log("tweets:",reply);
          res.render("trendywall.ejs", { layout: false, twitter_results:JSON.stringify(reply)});

        });           
        
        
    }