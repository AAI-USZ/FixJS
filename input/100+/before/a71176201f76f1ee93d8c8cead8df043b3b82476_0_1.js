function(result){
        if (!log(result).ok) { // something went wrong
            // ugh, forget it.... (unmark)
            it.deleting = false;
            li.removeAttr('deleting');
            // let the user know
            msgBox(result.error);
            return;
        }
        // if this number has changed, then we need to do a little extra work: the item became a deleted item.
        if (oldNumber !== result.folderDeletedCount) {
            pit.deletedItems.push(result.dynamicItem);
            updateDeletedItems(parent, result.dynamicItem);
        }
        // GUI refresh
        li.fadeOut(100, function(){
            li.remove();
            if (!getFirstChild(parent).size()) { 
                parent.find('ul:first').append(tpl.noChildren); // deleted last item of a folder
            }
        })        
    }