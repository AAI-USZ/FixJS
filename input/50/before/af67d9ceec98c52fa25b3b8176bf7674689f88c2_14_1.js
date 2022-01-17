function dumpListItemAsHTML(listItemElement, depth)
{
    var marker = layoutTestController.markerTextForListItem(listItemElement);
    return marker ? indent(depth) + ' ' + marker + ' ' + listItemElement.innerText.trim() + '<br/>' : '';
}