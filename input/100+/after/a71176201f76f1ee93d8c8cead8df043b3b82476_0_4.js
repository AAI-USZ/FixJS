function setExpanded(item, state) {
    if (state === undefined) state = true;
    var li = asLI(item);
    if (!li.size()) return;
    item = asItem(item);
    var button = li.find('.expansion-button:first');
    button.text(state ? '▲' : '▷');
    if (!isFolder(li) 
    || item && item.deleted) {  // deleted folders are not expandable
        button.css({visibility:'hidden'});
        return;        
    }
    if (isExpanded(li) == state) return;
    li.addClass(state ? 'expanded' : 'collapsed')
        .removeClass(!state ? 'expanded' : 'collapsed');
    // deal with the container of children
    var ul = li.find('ul:first');
    if (state) { // expanded
        if (!ul.size())
            ul = $('<ul>').appendTo(li);
    } 
    else {
        ul.remove();
    }        
    return true;
}