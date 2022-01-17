function addItemUnder(under, item, position) {
    if (!item) return false;
    if (position === undefined) position = 'sorted';
    under = asLI(under);
    if (under.hasClass('deleted-items')
    && typeof item == 'string') { // automatic construction of the special item
        item = {
            deleted: true,
            itemKind: item.endsBy('/') ? 'folder' : 'file',
            name: item.excludeTrailing('/'),
        };
    }

    // the UL element is the place for children, have one or create it  
    var x = under.children('ul'); 
    under = x.size() ? x : $('<ul>').appendTo(under);
    
     
    under.children('span.no-children').remove(); // remove any place holder
    var el = $(tpl.item).addClass(item.deleted ? 'deleted' : 'item');
    var beforeThis; // where to put the new item
    if (position.isIn('top','sorted')) { // both require to put the item after special items (so skip them)
        beforeThis = getFirstChild(under); // go down one level
        // skip special items
        while (beforeThis.size() && !beforeThis.hasClass('item')) { 
            beforeThis = beforeThis.next();
        }
    }
    if (position === 'sorted') {
        // skip elements until we find one that has a "higher" name (case-insensitively)
        var name = item.name.low(); 
        while (beforeThis.size()
            && beforeThis.hasClass('item')
            && beforeThis.find('.label').text().low() < name) {
            beforeThis = beforeThis.next();
        }
    }
    // add the item at the calculated position, or at the end
    (beforeThis && beforeThis.size())
        ? el.insertBefore(beforeThis)
        : el.appendTo(under);
    // do the final setup
    bindItemToDOM(item, el);
    setExpanded(el, false);    
}