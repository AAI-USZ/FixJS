function getItemDetails(request, response)
{
    var itemName = request.itemName;
    
    //store all teh found items
    var foundItems = [];
    
    if(itemName && itemName.length > 0)
    {
		itemName = itemName.toLowerCase();
        //loop through all the items and try and find it
        for(var i=0; i<ITEMS.length; i++)
        {
            if(ITEMS[i].name.toLowerCase().indexOf(itemName) != -1)
            {
                foundItems.push(ITEMS[i]);
            }
        }
        
        //try and find related items then...
        if(foundItems.length == 0)
        {
            console.log("founditems empty for " + itemName);
            //remove all the occurances of the exclude words
            for(var i=0; i<EXCLUDE_WORDS.length; i++)
            {
                if(itemName.indexOf(EXCLUDE_WORDS[i] + " ") != -1)
                {
                    itemName = itemName.replace(EXCLUDE_WORDS[i] + " ", "");
                }
            }
            
            console.log("now searching for #" + itemName + "#");
            
            //now perform the search again
            //loop through all the items and try and find it
            for(var i=0; i<ITEMS.length; i++)
            {
                if(ITEMS[i].name.toLowerCase().indexOf(itemName) != -1)
                {
                    foundItems.push(ITEMS[i]);
                }
            }
        }
        
    }
    
    response({items: foundItems});
}