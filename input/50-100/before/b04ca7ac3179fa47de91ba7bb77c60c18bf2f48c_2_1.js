function(data,response) {

            console.log('Request on complete');

            if(response.statusCode !== 200){
                console.log("Non 200 response: " + response.statusCode);
            }else{
                //var results = JSON.parse(data); 
               // populateArticlesForSection(section,results.articles);
                //callback(null,results.articles);
                res.json(JSON.parse(data));
            }

        }