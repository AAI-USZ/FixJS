function(id, count){
        //Function to save number of comments for this thingID.
        // Trim list to maximum 1000 links
        var itemsToKeep = null;
       chrome.extension.sendRequest({method: "getLocalStorage", key: "totalitems"}, function(response) {
           itemsToKeep = parseInt(response.data, 10);
       }); 
       var list=(localStorage.getItem('cc-list')||id).split(',');
        while (list.length > itemsToKeep){
            localStorage.removeItem('cc-'+list.shift());
        }
        // Save data for this thingID
        var now = new Date();
        if (list.indexOf(id)+1){
            list.push(id);
        }
        localStorage.setItem('cc-'+id,now.getTime()+','+count);
        localStorage.setItem('cc-list',list.join());
        //console.log("New comments time saved at: "+ now.toString());
    }