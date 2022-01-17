function(result){
        if (!result.ok) return;
        // do the job locally: remove the element from the array
        var a = asItem(folder).deletedItems;
        var i = a.length;
        while (i--) {
            if (sameFileName(a[i].excludeTrailing('/'), it.name)) {
                a.splice(i,1);
            }
        }
        // refresh GUI
        li.remove();
        updateDeletedItems(folder);
        addItemUnder(folder, result.item);
        // we are not going to automatically select the restored item, so it's easier to restore more files 
    }