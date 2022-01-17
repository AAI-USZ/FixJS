function(result){
        if (!result.ok) return;
        // do the job locally: remove the element from the array
        removeFromDeletedItems(asItem(folder), it.name);
        // refresh GUI
        li.remove();
        updateDeletedItems(folder);
        addItemUnder(folder, result.item);
        // we are not going to automatically select the restored item, so it's easier to restore more files 
    }