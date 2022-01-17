function dumpListItemAsHTML(listItemElement, depth)
{
    var marker = testRunner.markerTextForListItem(listItemElement);
    return marker ? indent(depth) + ' ' + marker + ' ' + listItemElement.innerText.trim() + '<br/>' : '';
}