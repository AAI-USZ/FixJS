function bindItemToDOM(item, element) {
    var li = asLI(element);
    item.element = li[0];  // bind the item to the html element, so we can get to it
    if (isFolder(item) && !item.deletedItems) {
        item.deletedItems = []; // having this always present will ease the rest of the code
    }   
    li.data({item:item});
    li.find('.label:first').text(item.name);
    var icon = isFolder(item) ? 'folder' : item.itemKind;
    if (icon=='file') {
        icon = nameToType(item.name) || icon;
    } 
    li.find('.icon:first').html("<img src='"+getIconURI(icon)+"' />");
    if (isFolder(item)) {
        updateDeletedItems(item);
    }
    return element;
}