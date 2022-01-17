function deleteItem() {
    // who's gonna be deleted?
    var li = getFirstSelected();
    if (isDeleted(li)) { // this a deleted one, what we really want is restore it
        restoreItem();
        return;
    }
    // we're not going to delete items that are root, or we are already deleting, or that are not! (special items)
    var it = asItem(li);
    if (!it || isRoot(it) || it.deleting) return;
    it.deleting = true; // mark it, so we avoid overlapping operations
    var parent = getParent(li); 
    var oldNumber = asItem(parent).deletedItems.length; // we'll use this to see if the number has changed at the end
    li.attr('deleting',1).fadeTo(100, 0.5); // mark it visually and at DOM level  
    vfsSelectNearby(li); // renew selection
    // server, please do it
    socket.emit('vfs.delete', { uri:getURI(it) }, function(result){
        if (!log('vfs.delete',result).ok) { // something went wrong
            // ugh, forget it.... (unmark)
            it.deleting = false;
            li.removeAttr('deleting').fadeIn(100);
            // let the user know
            msgBox(result.error);
            return;
        }
        // if this number has changed, then we need to do a little extra work: the item became a deleted item.
        if (oldNumber !== result.folderDeletedCount) {
            updateDeletedItems(parent, {adding:result.dynamicItem});
        }
        // GUI refresh
        li.fadeOut(100, function(){
            li.remove();
            if (!getFirstChild(parent).size()) { 
                parent.find('ul:first').append(tpl.noChildren); // deleted last item of a folder
            }
        })        
    });
}