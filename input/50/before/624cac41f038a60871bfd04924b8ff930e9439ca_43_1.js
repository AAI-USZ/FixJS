function(i, id){
                batchRequests.push({
                    "url": "/p/" + id + ".2.json",
                    "method": "GET"
                });
            }